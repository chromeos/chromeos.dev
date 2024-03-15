import type { APIRoute } from 'astro';
import { logger } from 'firebase-functions';
import bcrypt from 'bcrypt';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export const prerender = false;

// Valid Sanity webhook addresses
// https://www.sanity.io/files/webhooks-egress-ips.txt
// TODO: Automate the updating of this
const addresses = ['34.79.12.229', '35.205.99.116', '35.190.215.189'];

export const POST: APIRoute = async ({ request }) => {
  const key = request.headers.get('deploy-key') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '';

  const valid =
    ip && key && addresses.includes(ip) && (await bcrypt.compare(secret, key));

  logger.log('Webhook Detected');
  logger.log('IP: ', ip);
  logger.log('Valid: ', valid);

  // If not valid, stop working
  if (!valid) {
    return new Response(
      JSON.stringify({
        valid: false,
      }),
    );
  }

  // If it is valid, keep rolling

  return new Response(JSON.stringify('Valid Signature'));
};
