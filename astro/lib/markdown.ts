import markdown from 'chromeos-dev-markdown';
import { statsPlugin } from './markdown/stats';
import buildTOC from 'markdown-toc';

markdown.use(statsPlugin);
/**
 * Processes Markdown content and returns HTML
 * @param {string} content - markdown content
 * @return {string} Processed HTML
 */
export async function renderMarkdown(content: string) {
  const processed = markdown.render(content);
  const rawTOC = buildTOC(content).json.filter((item: any) => item.lvl < 4);
  const toc = [];
  for (let i = 0; i < rawTOC.length; i++) {
    const item = rawTOC[i];
    const built = {
      title: item.content,
      url: `#${item.slug}`,
    };
    let next = rawTOC[i + 1];
    // Ugly, but only one deep ugly, so do-able
    if (next && next.lvl > item.lvl) {
      built['children'] = [];
      while (next && next.lvl > item.lvl) {
        built['children'].push({
          title: next.content,
          url: `#${next.slug}`,
        });
        i++;
        next = rawTOC[i + 1];
      }
    }
    toc.push(built);
  }

  return {
    content: processed,
    toc,
  };
}
