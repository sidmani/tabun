// Schedule a card based on its parameters

// TODO: set these dynamically
const BASE_EASE = 2.5;
const STEP_1 = 1; // 1 minute
const STEP_2 = 10; // 10 minutes
const STEP_3 = 1440; // 1 day

// time is the unix time in minutes
module.exports.create = function create(time) {
  return {
    ease: BASE_EASE,
    interval: STEP_1,
    next: 0, // timestamp when card should be seen again
  }
}

function getEase(old, response) {
  return Math.max(old + 0.1 - ((3 - response) * (0.08 + (3 - response) * 0.02)), 1.3);
}

function state(card) {
  if (card.next === 0) {
    return 'new';
  } else if (card.interval <= STEP_2) {
    return 'learning';
  }
  return 'seen';
}

module.exports.getNextInterval = function getNextInterval(card, response, currentTime) {
  switch (state(card)) {
    case 'new': // next === 0
      // 0 <= response <= 2
      if (response === 0) {
        return STEP_1;
      } else if (response === 1) {
        return STEP_2;
      } else if (response === 2) {
        return STEP_3;
      }
      break;
    case 'learning': // next !== 0 and interval <= step_2
      // 0 <= response <= 2
      if (response === 0) {
        return STEP_1;
      } else if (response === 1) {
        return STEP_3;
      } else if (response === 2) {
        return STEP_3 * getEase(card.ease, response);
      }
      break;
    case 'seen': // interval > step_2
      // 0 <= response <= 3
      if (response === 0) {
        return STEP_2;
      } else if (response === 3) {
      /* Remembered easily not only increments the ease factor, but adds an
       * extra bonus to the current interval calculation. Thus, answering
       * remembered easily is a little more aggressive than the standard
       * SM2 algorithm.
       */
        return (card.interval + currentTime - card.next) * getEase(card.ease, response) * 1.2;
      } else {
        return (card.interval + currentTime - card.next) * getEase(card.ease, response);
      }
      break;
  }
}

module.exports.update = function update(card, response, currentTime) {
  card.ease = getEase(card.ease, response);
  card.interval = module.exports.getNextInterval(card, response, currentTime);
  card.next = currentTime + card.interval;
}
