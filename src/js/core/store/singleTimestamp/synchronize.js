module.exports = async function (other, contents) {
  const [foreign, local] = await Promise.all([other.timestamp(), this.timestamp()]);

  if (local > foreign) {
    await other.set(await this.get(), local);
  } else if (foreign > local) {
    await this.set(await other.get(), foreign);
  } else if (foreign === 0) {
    // both are 0, i.e. the sources do not exist
    if (!contents) {
      throw new Error('No data to synchronize!');
    }
    const now = new Date().getTime();
    await Promise.all([this.set(contents, now), other.set(contents, now)]);
  }

  // otherwise timestamps are equal and presumed already synchronized
};
