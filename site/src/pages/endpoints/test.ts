import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  return Response.json({ message: 'Hello, world!' });
};
