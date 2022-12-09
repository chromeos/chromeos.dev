/**
 *
 * @param {String} file - String of the data file being requested
 * @param {String} language - Translation group for the data
 * @return {Object}
 */
export async function getData(file, language) {
  const { default: data } = await import(`../_data/${file}.js`);
  return data[language];
}
