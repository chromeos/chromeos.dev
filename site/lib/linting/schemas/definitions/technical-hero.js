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
    $ref: '#/definitions/technical-hero',
  },
  definition: {
    type: 'object',
    description: 'Technical hero image',
    required: ['image'],
    additionalProperties: false,
    properties: {
      image: {
        type: 'object',
        description: 'Images for the hero',
        required: ['top', 'bottom'],
        additionalProperties: false,
        properties: {
          top: {
            type: 'string',
            format: 'uri-reference',
            description: 'URL to the image to use when displayed large, cropped to the top',
          },
          bottom: {
            type: 'string',
            format: 'uri-reference',
            description: 'URL to the image to use when displayed small, cropped to the bottom',
          },
        },
      },
    },
  },
};
