import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const prerender = false;

export const GET: APIRoute = async () => {
  const done = await octokit.rest.actions.createWorkflowDispatch({
    owner: 'chromeos',
    repo: 'chromeos.dev',
    workflow_id: 'tbd-site.yml',
    ref: 'refactor/the-great-cms-migration',
  });
  console.log(done);
  return Response.json({ message: 'Hello, world!', date: new Date() });
};
