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
import { Box, Card, Text } from '@sanity/ui';
import { PortableText } from '@portabletext/react';

export default defineType({
  name: 'message',
  title: 'Message',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['', 'note', 'warning', 'tip'],
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'restricted-block',
    }),
  ],
  components: {
    preview: ({ message, type }) => {
      const background =
        type === 'note'
          ? '#aecbfa'
          : type === 'warning'
          ? '#fde293'
          : '#f6aea9';
      const borderColor =
        type === 'note'
          ? '#1967d2'
          : type === 'warning'
          ? '#f29900'
          : '#c5221f';
      const color = '#202124';
      return (
        <Box>
          <Card
            padding={2}
            style={{
              background,
              borderRadius: '5px',
              padding: '.5rem .75rem',
              borderColor,
              borderStyle: 'solid',
              borderWidth: '2px',
            }}
          >
            <Text size={1} style={{ color }}>
              <PortableText value={message} />
            </Text>
          </Card>
        </Box>
      );
    },
  },
  preview: {
    select: {
      type: 'type',
      message: 'text',
    },
    prepare({ type, message }) {
      return {
        type: type,
        message: message,
      };
    },
  },
});
