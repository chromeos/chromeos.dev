import type {
  MiddlewareResponseHandler,
  MiddlewareNextResponse,
  APIContext,
} from 'astro';

import { posthtml } from '$lib/posthtml';
import { sequence } from 'astro/middleware';
import redirects from '../redirects.json';
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
  { request, site }: APIContext,
  next: MiddlewareNextResponse,
) => {
  const url = new URL(request.url);
  const { pathname } = url;

  const redirect = new URL(site.href);
  redirect.hash = url.hash;
  redirect.search = url.search;

  // ES redirect
  if (pathname.startsWith('/es')) {
    redirect.pathname = pathname.replace('/es', '/en');
    return Response.redirect(redirect, 307);
  }

  // Homepage redirect
  if (pathname === '/') {
    redirect.pathname = '/en';
    return Response.redirect(redirect, 301);
  }

  // News pagination redirect
  const newsRegex = /^\/(\w{2})\/news\/1$/;
  if (newsRegex.test(pathname)) {
    const [, lang] = newsRegex.exec(pathname);
    redirect.pathname = `/${lang}/news`;
    return Response.redirect(redirect, 301);
  }

  for (const [from, to] of Object.entries(redirects)) {
    if (pathname === from) {
      redirect.pathname = to;
      return Response.redirect(redirect, 301);
    }
  }

  return next();
};

export const onRequest = sequence(redirect, postprocess);
