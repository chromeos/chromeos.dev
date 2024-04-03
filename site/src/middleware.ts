import type {
  MiddlewareResponseHandler,
  MiddlewareNextResponse,
  APIContext,
} from 'astro';

import { posthtml } from '$lib/posthtml';
import { sequence } from 'astro/middleware';

import { extname } from 'path';

/**
 * Postproceses HTML responses
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

/**
 * Redirects responses
 * @param {APIContext} context Request context
 * @param {MiddlewareNext} next = Response object
 * @return {Response | MiddlewareNextResponse}
 */
const redirect: MiddlewareResponseHandler = async (
  { request }: APIContext,
  next: MiddlewareNextResponse,
) => {
  const url = new URL(request.url);
  const { pathname } = url;

  // ES redirect
  if (pathname.startsWith('/es')) {
    url.pathname = pathname.replace('/es', '/en');
    return Response.redirect(url, 307);
  }

  // Homepage redirect
  if (pathname === '/') {
    url.pathname = '/en';
    return Response.redirect(url, 301);
  }

  // News pagination redirect
  const newsRegex = /^\/(\w{2})\/news\/1$/;
  if (newsRegex.test(pathname)) {
    const [, lang] = newsRegex.exec(pathname);
    url.pathname = `/${lang}/news`;
    return Response.redirect(url, 301);
  }
  return next();
};

export const onRequest = sequence(redirect, postprocess);
