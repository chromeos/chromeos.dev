/**
 * Copyright 2019 Google LLC
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

module.exports = {
  property: {
    $ref: '#/definitions/hero',
  },
  definition: {
    type: 'object',
    description: 'Hero image',
    required: ['image', 'alt'],
    additionalProperties: false,
    properties: {
      image: {
        type: 'string',
        format: 'uri-reference',
        description: 'URL to the image',
      },
      alt: {
        type: 'string',
        description: 'Alt text describing the image',
        minLength: 5,
      },
      position: {
        type: 'string',
        description: 'How to place the image in its container',
        enum: ['top', 'bottom', 'center'],
      },
    },
  },
};
