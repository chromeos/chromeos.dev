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
import { defineType } from 'sanity';
import { isUniqueAcrossBaseLanguages, isL10n } from '$lib/validators/i18n';

export default defineType({
  name: 'l10n-slug',
  title: 'l10n Slug',
  description: 'A slug that is unique across base languages',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96,
    isUnique: isUniqueAcrossBaseLanguages,
  },
  validation: (Rule) => Rule.required(),
  readOnly: isL10n,
  hidden: isL10n,
});
