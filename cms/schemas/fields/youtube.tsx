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
import { defineType, defineField } from 'sanity';
import { YouTubeInput, YouTubePreview } from '$components/YouTube';
import getYouTubeId from 'get-youtube-id';

export default defineType({
  name: 'youtube',
  title: 'Youtube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube Video URL',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }).custom((url) =>
          url
            ? getYouTubeId(url)
              ? true
              : 'Must be a valid YouTube Video URL'
            : true,
        ),
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'YouTube Video ID',
    }),
  ],
  components: {
    input: YouTubeInput,
    preview: YouTubePreview,
  },
  preview: {
    select: {
      id: 'id',
    },
    prepare({ id }) {
      return {
        id: id,
      };
    },
  },
});
