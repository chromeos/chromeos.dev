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

const test = require('ava');
const AJV = require('ajv');
const clone = require('lodash.clonedeep');
const schema = require('../../lib/linting/schemas/posts');

test.beforeEach((t) => {
  const ajv = new AJV({
    allErrors: true,
  });
  require('ajv-merge-patch')(ajv);
  t.context.validate = ajv.compile(schema);
});

test('Required Fields', (t) => {
  const input = {
    title: 'High engagement, larger screens',
    metadesc: 'Android fuels mobile apps on devices that range far beyond your typical small-screen smartphone.',
    tags: ["leader's corner", 'trend', 'large screens', 'window management', 'mouse support', 'keyboard support', 'android'],
    authors: ['allanl'],
    date: '2019-10-24T00:00:00.000Z',
  };
  const valid = t.context.validate(input);

  t.is(valid, true);
});

test('Optional Fields', (t) => {
  const input = {
    title: 'Large screen Android',
    metadesc: 'This is the new Android content. Its great.',
    authors: ['allanl'],
    hero: {
      image: '/images/hero/awesome-fun-time.jpg',
      alt: 'Description of image',
      position: 'top',
    },
    date: '2019-10-24T00:00:00.000Z',
    tools: [
      {
        name: 'Android Studio',
        url: 'https://developers.android.com',
        versions: {
          min: 10,
          max: 'latest',
        },
      },
      {
        name: 'Another Dependency',
        url: '/awesome-tool',
        versions: {
          min: 'all',
        },
      },
      {
        name: 'Another Studio',
        url: 'https://developers.android.com/tool',
        versions: {
          min: 'start',
          max: 20,
        },
      },
    ],
    featured: true,
  };
  const valid = t.context.validate(input);
  t.is(valid, true);

  const featuredOptions = [
    { eyebrow: 'Hello' },
    { title: 'An Awesome Title' },
    { desc: 'This is a cool desc' },
    { cta: 'Go!' },
    {
      images: [
        {
          image: '/awesome-tool.jpg',
          alt: 'Hello World',
        },
      ],
    },
  ];

  for (const option of featuredOptions) {
    const optionFeatured = clone(input);
    optionFeatured.featured = option;
    const isValid = t.context.validate(optionFeatured);
    t.is(isValid, true);
  }

  const fullFeatured = clone(input);
  fullFeatured.featured = featuredOptions.reduce((r, c) => Object.assign(r, c));
  const isValid = t.context.validate(fullFeatured);
  t.is(isValid, true);
});

test('Missing Fields', (t) => {
  const input = {};
  const valid = t.context.validate(input);

  const errors = [
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'title' },
      message: "should have required property 'title'",
    },
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'metadesc' },
      message: "should have required property 'metadesc'",
    },
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'date' },
      message: "should have required property 'date'",
    },
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'authors' },
      message: "should have required property 'authors'",
    },
    {
      keyword: '$merge',
      dataPath: '',
      schemaPath: '#/$merge',
      params: { keyword: '$merge' },
      message: 'should pass "$merge" keyword validation',
    },
  ];

  t.is(valid, false);
  t.deepEqual(t.context.validate.errors, errors);
});

test('Extra Fields', (t) => {
  const input = {
    title: 'High engagement, larger screens',
    metadesc: 'Android fuels mobile apps on devices that range far beyond your typical small-screen smartphone.',
    tags: ["leader's corner", 'trend', 'large screens', 'window management', 'mouse support', 'keyboard support', 'android'],
    authors: ['allanl'],
    date: '2019-10-24T00:00:00.000Z',
    banana: 'bob',
  };
  const valid = t.context.validate(input);

  const errors = [
    {
      keyword: 'additionalProperties',
      dataPath: '',
      schemaPath: '#/additionalProperties',
      params: { additionalProperty: 'banana' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: '$merge',
      dataPath: '',
      schemaPath: '#/$merge',
      params: { keyword: '$merge' },
      message: 'should pass "$merge" keyword validation',
    },
  ];

  t.is(valid, false);
  t.deepEqual(t.context.validate.errors, errors);
});

test('Fields Validation', (t) => {
  const input = {
    title: '',
    metadesc: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    tags: 123,
    authors: 'allanl',
    date: '2010-10-05',
    hero: {
      dat: 'image',
    },
    featured: 'steve',
  };

  const errors = [
    {
      keyword: 'minLength',
      dataPath: '.title',
      schemaPath: '#/properties/title/minLength',
      params: { limit: 5 },
      message: 'should NOT be shorter than 5 characters',
    },
    {
      keyword: 'maxLength',
      dataPath: '.metadesc',
      schemaPath: '#/properties/metadesc/maxLength',
      params: { limit: 200 },
      message: 'should NOT be longer than 200 characters',
    },
    {
      keyword: 'format',
      dataPath: '.date',
      schemaPath: '#/properties/date/format',
      params: { format: 'date-time' },
      message: 'should match format "date-time"',
    },
    {
      keyword: 'type',
      dataPath: '.tags',
      schemaPath: '#/properties/tags/type',
      params: { type: 'array' },
      message: 'should be array',
    },
    {
      keyword: 'type',
      dataPath: '.authors',
      schemaPath: '#/properties/authors/type',
      params: { type: 'array' },
      message: 'should be array',
    },
    {
      keyword: 'type',
      dataPath: '.featured',
      schemaPath: '#/definitions/featured/type',
      params: { type: 'object,boolean' },
      message: 'should be object,boolean',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/additionalProperties',
      params: { additionalProperty: 'dat' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'required',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/required',
      params: { missingProperty: 'alt' },
      message: "should have required property 'alt'",
    },
    {
      keyword: 'required',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/oneOf/0/required',
      params: { missingProperty: 'image' },
      message: "should have required property 'image'",
    },
    {
      keyword: 'required',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/oneOf/1/required',
      params: { missingProperty: 'youtube' },
      message: "should have required property 'youtube'",
    },
    {
      keyword: 'oneOf',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/oneOf',
      params: { passingSchemas: null },
      message: 'should match exactly one schema in oneOf',
    },
    {
      keyword: '$merge',
      dataPath: '',
      schemaPath: '#/$merge',
      params: { keyword: '$merge' },
      message: 'should pass "$merge" keyword validation',
    },
  ];

  const valid = t.context.validate(input);
  t.is(valid, false);

  t.deepEqual(t.context.validate.errors, errors);

  const featuredOptions = [
    { eyebrow: '' },
    { title: 123 },
    { desc: 'abd' },
    { cta: 'GO' },
    {
      images: [
        {
          image: '/awesome-tool.jpg',
          alt: 'Hello World',
          foo: 'bar',
        },
      ],
    },
    { another: 'field' },
  ];

  const fullFeatured = clone(input);
  fullFeatured.featured = featuredOptions.reduce((r, c) => Object.assign(r, c));
  const isValid = t.context.validate(fullFeatured);

  const featuredErrors = [
    {
      keyword: 'minLength',
      dataPath: '.title',
      schemaPath: '#/properties/title/minLength',
      params: { limit: 5 },
      message: 'should NOT be shorter than 5 characters',
    },
    {
      keyword: 'maxLength',
      dataPath: '.metadesc',
      schemaPath: '#/properties/metadesc/maxLength',
      params: { limit: 200 },
      message: 'should NOT be longer than 200 characters',
    },
    {
      keyword: 'format',
      dataPath: '.date',
      schemaPath: '#/properties/date/format',
      params: { format: 'date-time' },
      message: 'should match format "date-time"',
    },
    {
      keyword: 'type',
      dataPath: '.tags',
      schemaPath: '#/properties/tags/type',
      params: { type: 'array' },
      message: 'should be array',
    },
    {
      keyword: 'type',
      dataPath: '.authors',
      schemaPath: '#/properties/authors/type',
      params: { type: 'array' },
      message: 'should be array',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.featured',
      schemaPath: '#/definitions/featured/additionalProperties',
      params: { additionalProperty: 'another' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'minLength',
      dataPath: '.featured.eyebrow',
      schemaPath: '#/definitions/featured/properties/eyebrow/minLength',
      params: { limit: 3 },
      message: 'should NOT be shorter than 3 characters',
    },
    {
      keyword: 'type',
      dataPath: '.featured.title',
      schemaPath: '#/definitions/featured/properties/title/type',
      params: { type: 'string' },
      message: 'should be string',
    },
    {
      keyword: 'minLength',
      dataPath: '.featured.desc',
      schemaPath: '#/definitions/featured/properties/desc/minLength',
      params: { limit: 10 },
      message: 'should NOT be shorter than 10 characters',
    },
    {
      keyword: 'minLength',
      dataPath: '.featured.cta',
      schemaPath: '#/definitions/featured/properties/cta/minLength',
      params: { limit: 3 },
      message: 'should NOT be shorter than 3 characters',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.featured.images[0]',
      schemaPath: '#/definitions/featured/properties/images/items/additionalProperties',
      params: { additionalProperty: 'foo' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/additionalProperties',
      params: { additionalProperty: 'dat' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'required',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/required',
      params: { missingProperty: 'image' },
      message: "should have required property 'image'",
    },
    {
      keyword: 'required',
      dataPath: '.hero',
      schemaPath: '#/definitions/hero/required',
      params: { missingProperty: 'alt' },
      message: "should have required property 'alt'",
    },
    {
      keyword: '$merge',
      dataPath: '',
      schemaPath: '#/$merge',
      params: { keyword: '$merge' },
      message: 'should pass "$merge" keyword validation',
    },
  ];

  t.is(isValid, false);
  t.deepEqual(t.context.validate.errors, featuredErrors);
});

// TODO - Add tests for theme
