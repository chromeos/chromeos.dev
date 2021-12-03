/**
 *
 * @param {String} file - String of the data file being requested
 * @param {String} language - Translation group for the data
 * @return {Object}
 */
export async function getData(file, language) {
  const path = `/js/_data/${file}.js`;
  const { default: data } = await import(path);

  return data[language];
}
