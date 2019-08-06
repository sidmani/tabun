function findSplit(arrA, arrB) {
  let i = arrA.length - 1;
  let j = arrB.length - 1;

  // find the fork in the version history
  // create a list of versions that need to be synced in each direction
  while (i >= 0 || j >= 0) {
    if (arrA[i] === arrB[j]) {
      break;
    }

    if (j < 0 || arrA[i] > arrB[j]) {
      i -= 1;
    } else if (i < 0 || arrA[i] < arrB[j]) {
      j -= 1;
    }
  }

  return {
    a: i,
    b: j,
  };
}

// flattens multiple versions into a single set of changes
function flatten(versions) {

}

function merge (versionsA, versionsB) {
  // versions looks like: { versionId: { noteId1: { ease, etc } } }
  const result = {};

};

module.exports = async function (other) {
  // get the version lists from both sources
  const [localVersions, foreignVersions] = await Promise.all([this.versions(), other.versions()]);
  const unsynced = findSplit(localVersions, foreignVersions);

  let unsyncedLocal;
  let unsyncedForeign;
  if (unsynced.a === -1 && unsynced.b === -1) {
    // could not find fork, do a full sync
  } else if (unsynced.a === localVersions.length - 1 && unsynced.b === foreignVersions.length - 1) {
    // done.
    return;
  } else if (unsynced.a === localVersions.length - 1) {
    // one-way a -> b
  } else {
    // two-way merge with new version
  }

  const [localChanges, foreignChanges] = await Promise.all([
    this.getVersions(localVersions),
    other.getVersions(foreignVersions),
  ]).map(flatten);

  // localChanges looks like: { noteId: { note data } }
  // if localChanges and foreignChanges both nonzero, then create new version and sync both ways
  // else if localChanges nonzero, use max version and sync one-way
  // else if foreignChanges nonzero, same thing

  const newVersion = new Date().getTime();

};
