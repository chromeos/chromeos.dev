import sanity from '@sanity/client'

const project = import.meta.env?.SANITY_STUDIO_PROJECT || process?.env?.SANITY_STUDIO_PROJECT;
const token = import.meta.env?.SANITY_TOKEN || process?.env?.SANITY_TOKEN;


const config = {
  projectId: project,
  dataset: 'development',
  apiVersion: '2022-12-16',
  useCdn: false,
}

if (token) {
  config.token = token;
}

export default sanity(config);