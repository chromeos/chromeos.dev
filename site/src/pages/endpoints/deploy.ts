import type { APIRoute } from 'astro';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers[SIGNATURE_HEADER_NAME];
  const body = await request.text();

  console.log('A DEPLOY REQUEST WAS MADE');
  console.log(body);

  const valid = await isValidSignature(body, signature, secret);

  if (!valid) {
    return new Response(
      JSON.stringify({
        error: 'Invalid Signature',
        sent: body,
      }),
      { status: 401 },
    );
  }

  return new Response(JSON.stringify('Valid Signature'));
};
