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
import inlineBlockField from '$fields/inline-block';
import cellBlockField from '$fields/cell-block';
import pictureField from '$fields/picture';
import titleField from '$fields/title';
import descriptionField from '$fields/description';
import eyebrowField from '$fields/eyebrow';
import backgroundsField from '$fields/backgrounds';
import linkField from '$fields/link';
import structuredLinkField from '$fields/structured-link';
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
import keyValueField from '$fields/key-value';
import statisticField from '$fields/statistic';
import ctaField from '$fields/cta';
import fieldField from '$fields/field';
import tableField from '$fields/table';
import textLinkField from '$fields/text-link';

// Subschemas
import heroSubschema from '$subschema/hero';
import featuredSubschema from '$subschema/featured';
import shareSubschema from '$subschema/share';
import softwareSubschema from '$subschema/software';
import themeSubschema from '$subschema/theme';
import appSubschema from '$subschema/app';
import resourcesSubschema from '$subschema/resources';
import homepageCardSchema from '$subschema/homepage-card';
import bannerSubschema from '$subschema/banner';

// Schemas
import tag from './tag';
import post from './post';
import story from './story';
import author from './author';
import theme from './theme';
import documentation from './documentation';
import microcopy from './microcopy';
import home from './home';
import nav from './nav';
import news from './news';
import newsletter from './newsletter';
import stories from './stories';
import cookies from './cookies';
import pwas from './pwas';
import landing from './landing';
import appSupport from './app-support';

export const schemaTypes = [
  // Schemas
  post,
  story,
  documentation,
  author,
  tag,
  theme,
  microcopy,
  home,
  nav,
  news,
  newsletter,
  stories,
  cookies,
  pwas,
  landing,
  appSupport,

  // Fields
  fullBlockField,
  restrictedBlockField,
  inlineBlockField,
  cellBlockField,
  pictureField,
  titleField,
  descriptionField,
  eyebrowField,
  backgroundsField,
  linkField,
  structuredLinkField,
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
  keyValueField,
  statisticField,
  ctaField,
  fieldField,
  tableField,
  textLinkField,

  // Subschema
  heroSubschema,
  featuredSubschema,
  shareSubschema,
  softwareSubschema,
  themeSubschema,
  appSubschema,
  resourcesSubschema,
  homepageCardSchema,
  bannerSubschema,
];
