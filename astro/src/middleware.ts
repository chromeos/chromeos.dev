import type {
  MiddlewareResponseHandler,
  MiddlewareNextResponse,
  APIContext,
} from 'astro';

import { posthtml } from '$lib/posthtml';
import { sequence } from 'astro/middleware';

import { extname } from 'path';

/**
 *
 * @param {APIContext} context Request context
 * @param {MiddlewareNext} next = Response object
 * @return {Response | MiddlewareNextResponse}
 */
const postprocess: MiddlewareResponseHandler = async (
  { request }: APIContext,
  next: MiddlewareNextResponse,
) => {
  const url = new URL(request.url);
  const ext = extname(url.pathname);
  if (ext === '' || ext === '.html') {
    const response = await next();

    const html = await response.text();

    const processed = await posthtml.process(html);

    return new Response(processed.html, {
      status: 200,
      headers: response.headers,
    });
  }
  return next();
};

export const onRequest = sequence(postprocess);
