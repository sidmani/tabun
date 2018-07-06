module.exports = async function synchronize(other, contents) {
  const foreignTimestamp = await other.timestamp();
  const localTimestamp = await this.timestamp();

  if (localTimestamp > foreignTimestamp) {
    return other.set(await this.get());
  } else if (remoteTimestamp > localTimestamp) {
    return this.set(await other.get());
  } else if (remoteTimestamp === 0) {
    // both are 0, i.e. they do not exist
    if (!contents) {
      throw new Error('No data to synchronize!');
    }

    return Promise.all([this.set(contents), other.set(contents)]);
  }
};
