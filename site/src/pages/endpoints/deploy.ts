import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';
import { logger } from 'firebase-functions';
import bcrypt from 'bcrypt';

const secret = process.env.SANITY_WEBHOOK_SECRET;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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

  logger.log('Deploy Requested');
  logger.log('IP: ', ip);
  logger.log('Valid: ', valid);

  // If not valid, stop working
  if (!valid) {
    logger.info('Unauthorized');
    return new Response('Unauthorized to trigger deploy.', { status: 403 });
  }

  // If it is valid, try triggering a deploy
  logger.info('Triggering deploy');
  try {
    await octokit.rest.actions.createWorkflowDispatch({
      owner: 'chromeos',
      repo: 'chromeos.dev',
      workflow_id: 'tbd-site.yml',
      ref: 'main', // Swap to main when ready
    });
    logger.info('Deploy requested');
    return new Response('Deploy triggered', { status: 200 });
  } catch (e) {
    logger.error(e);
    return new Response('Error triggering deploy', {
      status: 500,
    });
  }
};
