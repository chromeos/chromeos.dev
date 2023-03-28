import markdown from 'chromeos-dev-markdown';
import { posthtml } from './posthtml';
import { statsPlugin } from './markdown/stats';

markdown.use(statsPlugin);
/**
 * Processes Markdown content and returns HTML
 * @param {string} content - markdown content
 * @return {string} Processed HTML
 */
export async function renderMarkdown(content: string) {
  const html = markdown.render(content);
  const processed = await posthtml.process(html);
  return processed.html;
}
