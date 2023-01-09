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
import { minMax } from '$lib/validators/min-max';

export const descriptionValidation = minMax(10, 155);

export default defineType({
  name: 'description',
  title: 'Description',
  description:
    'A short description of the content. Used to preview the content in lists as well as in search results and social posts.',
  type: 'string',
  validation: descriptionValidation(true),
});
