/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { defineConfig, isDev } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { withDocumentI18nPlugin } from '@sanity/document-internationalization';
import { deskStructure, defaultDocumentNodeResolver } from '$lib/desk';
import { theme as _theme } from './lib/theme';
import './lib/overrides.css';

const devOnlyPlugins = [visionTool()];

const theme = _theme as import('sanity').StudioTheme;

const plugins = withDocumentI18nPlugin(
  (pluginConfig) => [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: defaultDocumentNodeResolver,
    }),
    codeInput(),
    table(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  {
    includeDeskTool: false,
    languages: [
      { id: 'en_US', title: 'English' },
      { id: 'es', title: 'Spanish' },
    ],
  },
);

const schema = {
  types: schemaTypes,
};

export default defineConfig([
  {
    theme,
    name: 'testing',
    basePath: '/test',
    title: 'Testing',

    projectId: import.meta.env.SANITY_STUDIO_PROJECT || '',
    dataset: import.meta.env.SANITY_STUDIO_DEV_DATASET || '',

    plugins,

    // TODO: configure table to allow limited HTML in rows

    schema,
  },
  {
    theme,
    name: 'production',
    basePath: '/',
    title: 'Production',

    projectId: import.meta.env.SANITY_STUDIO_PROJECT || '',
    dataset: import.meta.env.SANITY_STUDIO_PROD_DATASET || '',

    plugins,

    // TODO: configure table to allow limited HTML in rows

    schema,
  },
]);
