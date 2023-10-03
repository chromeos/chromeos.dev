/**
 *
 * @param {*[]} content Array of any content, with a _lang property
 * @param {boolean} coalesce Whether to combine results into an array
 * @return {Object} Object of items grouped by language
 */
export function groupByLanguage(content: Array<any>, coalesce = true) {
  return content.reduce((acc, cur) => {
    if (coalesce) {
      if (!acc[cur._lang]) {
        acc[cur._lang] = [];
      }
      acc[cur._lang].push(cur);
    } else {
      acc[cur?._lang] = cur;
    }
    return acc;
  }, {});
}
