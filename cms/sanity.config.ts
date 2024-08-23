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
import {
  documentInternationalization,
  // DeleteTranslationAction,
} from '@sanity/document-internationalization';
import { deskStructure, defaultDocumentNodeResolver } from '$lib/desk';
import { theme as _theme } from './lib/theme';
import { LANGUAGES, i18nSCHEMAS } from './lib/constants';
import './lib/overrides.css';

const devOnlyPlugins = [visionTool()];

const theme = _theme as import('sanity').StudioTheme;

const plugins = [
  deskTool({
    structure: deskStructure,
    defaultDocumentNode: defaultDocumentNodeResolver,
  }),
  codeInput(),
  ...(isDev ? devOnlyPlugins : []),
  documentInternationalization({
    supportedLanguages: LANGUAGES,
    schemaTypes: i18nSCHEMAS,
  }),
];

const schema = {
  types: schemaTypes,
};

export default defineConfig({
  theme,
  name: isDev ? 'development' : 'production',
  basePath: isDev ? '/dev' : '/',
  title: isDev ? 'Development' : 'Production',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT || '',
  dataset: isDev
    ? import.meta.env.SANITY_STUDIO_DEV_DATASET || ''
    : import.meta.env.SANITY_STUDIO_PROD_DATASET || '',

  plugins,

  // TODO: configure table to allow limited HTML in rows
  schema: {
    ...schema,
    // Filter out the default template for new "page" and "lesson" type documents
    templates: (prev) =>
      prev.filter((template) => !i18nSCHEMAS.includes(template.id)),
  },
  scheduledPublishing: {
    enabled: true,
    inputDateTimeFormat: 'MM/dd/yyyy h:mm a',
  },
  // Allow document translations to be deleted
  // document: {
  //   actions: (prev, { schemaType }) => {
  //     // Add to the same schema types you use for internationalization
  //     if (i18nSCHEMAS.includes(schemaType)) {
  //       // You might also like to filter out the built-in "delete" action
  //       return [...prev, DeleteTranslationAction];
  //     }

  //     return prev;
  //   },
  // },
});
