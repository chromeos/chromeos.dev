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
import { defineType, defineArrayMember, defineField } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Full Block Content',
  name: 'full-block',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Keyboard', value: 'kbd' },
          { title: 'Code', value: 'code' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                title: 'Source',
                name: 'source',
                type: 'link',
              }),
            ],
          },
          {
            title: 'Abbreviation',
            name: 'abbreviation',
            type: 'object',
            fields: [
              defineField({
                name: 'abbreviation',
                type: 'abbreviation',
              }),
            ],
          },
          {
            title: 'Footnote',
            name: 'footnote',
            type: 'object',
            fields: [
              defineField({
                title: 'Description',
                name: 'description',
                type: 'footnote',
              }),
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'picture',
      title: 'Image',
    }),
    defineArrayMember({
      type: 'figure',
      title: 'Figure',
    }),
    // TODO: Make this preview the video
    defineArrayMember({
      name: 'youtube',
      title: 'YouTube',
      type: 'object',
      fields: [
        defineField({
          name: 'video',
          title: 'Video',
          type: 'youtube',
        }),
      ],
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code',
      options: {
        withFilename: true,
        // TODO: Make sure all of these render
        // See https://github.com/sanity-io/code-input#add-support-for-more-languages
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Sass', value: 'sass' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'Java', value: 'java' },
          { title: 'XML', value: 'xml' },
          { title: 'Groovy', value: 'groovy' },
          { title: 'Bash', value: 'sh' },
        ],
      },
    }),
    defineArrayMember({
      type: 'deflist',
      title: 'Definitions',
    }),
    defineArrayMember({
      type: 'statlist',
      title: 'Stats',
    }),
    defineArrayMember({
      type: 'message',
      title: 'Message',
    }),
    defineArrayMember({
      type: 'quote',
      title: 'Quote',
    }),
    defineArrayMember({
      type: 'break',
      title: 'Break',
    }),
    defineArrayMember({
      type: 'table',
      title: 'Table',
    }),
  ],
});
