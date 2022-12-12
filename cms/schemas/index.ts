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
// Fields
import fullBlockField from '$fields/full-block';
import restrictedBlockField from '$fields/restricted-block';
import inlieBlockField from '$fields/inline-block';
import pictureField from '$fields/picture';
import titleField from '$fields/title';
import descriptionField from '$fields/description';
import eyebrowField from '$fields/eyebrow';
import backgroundsField from '$fields/backgrounds';
import linkField from '$fields/link';
import footnoteField from '$fields/footnote';
import youtubeField from '$fields/youtube';
import figureField from '$fields/figure';
import deflistField from '$fields/deflist';
import messageField from '$fields/message';
import statlistField from '$fields/statlist';
import quoteField from '$fields/quote';
import breakField from '$fields/break';
import abbreviationField from '$fields/abbreviation';
import l10nSlugField from '$fields/l10n-slug';

// Subschemas
import heroSubschema from '$subschema/hero';
import featuredSubschema from '$subschema/featured';
import shareSubschema from '$subschema/share';
import softwareSubschema from '$subschema/software';
import themeSubschema from '$subschema/theme';
import appSubschema from '$subschema/app';
import resourcesSubschema from '$subschema/resources';

// Schemas
import tag from './tag';
import post from './post';
import story from './story';
import author from './author';
import theme from './theme';
import documentation from './documentation';

export const schemaTypes = [
  // Schemas
  post,
  story,
  documentation,
  author,
  tag,
  theme,

  // Fields
  fullBlockField,
  restrictedBlockField,
  inlieBlockField,
  pictureField,
  titleField,
  descriptionField,
  eyebrowField,
  backgroundsField,
  linkField,
  footnoteField,
  youtubeField,
  figureField,
  deflistField,
  messageField,
  statlistField,
  quoteField,
  breakField,
  abbreviationField,
  l10nSlugField,

  // Subschema
  heroSubschema,
  featuredSubschema,
  shareSubschema,
  softwareSubschema,
  themeSubschema,
  appSubschema,
  resourcesSubschema,
];
