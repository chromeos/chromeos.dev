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
const schema = require('../../lib/linting/schemas/technical');

test.beforeEach(t => {
  const ajv = new AJV({
    allErrors: true,
  });
  require('ajv-merge-patch')(ajv);
  t.context.validate = ajv.compile(schema);
});

test('Required Fields', t => {
  const input = {
    title: 'Large screen Android',
    metadesc: 'This is the new Android content.',
    date: '2019-10-24T00:00:00.000Z',
  };
  const valid = t.context.validate(input);

  t.is(valid, true);
});

test('Optional Fields', t => {
  const input = {
    title: 'Large screen Android',
    metadesc: 'This is the new Android content.',
    weight: -1,
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
    resources: [
      {
        title: 'Android',
        url: '/android',
      },
      {
        title: 'Google',
        url: 'https://google.com',
      },
    ],
  };
  const valid = t.context.validate(input);

  t.is(valid, true);
});

test('Missing Fields', t => {
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

test('Extra Fields', t => {
  const input = {
    title: 'Large screen Android',
    metadesc: 'This is the new Android content.',
    date: '2019-10-24T00:00:00.000Z',
    banana: 'foo',
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

test('Fields Validation', t => {
  const input = {
    title: '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    metadesc: '',
    weight: 'first',
    date: '2019-10-24',
    tools: [
      {
        name: 'Android Studio',
        url: 'https://developers.android.com',
        versions: {
          min: 10,
          max: 'latest',
          another: 'version',
        },
        extra: 'tool',
      },
      {},
    ],
    resources: [
      {},
      {
        title: 'Google',
        url: 'https://google.com',
        resource: 'extra',
      },
    ],
  };
  const valid = t.context.validate(input);

  const errors = [
    {
      keyword: 'maxLength',
      dataPath: '.title',
      schemaPath: '#/properties/title/maxLength',
      params: { limit: 100 },
      message: 'should NOT be longer than 100 characters',
    },
    {
      keyword: 'minLength',
      dataPath: '.metadesc',
      schemaPath: '#/properties/metadesc/minLength',
      params: { limit: 5 },
      message: 'should NOT be shorter than 5 characters',
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
      dataPath: '.weight',
      schemaPath: '#/properties/weight/type',
      params: { type: 'integer' },
      message: 'should be integer',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.tools[0]',
      schemaPath: '#/definitions/tools/additionalProperties',
      params: { additionalProperty: 'extra' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.tools[0].versions',
      schemaPath: '#/definitions/tools/properties/versions/additionalProperties',
      params: { additionalProperty: 'another' },
      message: 'should NOT have additional properties',
    },
    {
      keyword: 'required',
      dataPath: '.tools[1]',
      schemaPath: '#/definitions/tools/required',
      params: { missingProperty: 'name' },
      message: "should have required property 'name'",
    },
    {
      keyword: 'required',
      dataPath: '.tools[1]',
      schemaPath: '#/definitions/tools/required',
      params: { missingProperty: 'url' },
      message: "should have required property 'url'",
    },
    {
      keyword: 'required',
      dataPath: '.tools[1]',
      schemaPath: '#/definitions/tools/required',
      params: { missingProperty: 'versions' },
      message: "should have required property 'versions'",
    },
    {
      keyword: 'required',
      dataPath: '.resources[0]',
      schemaPath: '#/definitions/resources/required',
      params: { missingProperty: 'title' },
      message: "should have required property 'title'",
    },
    {
      keyword: 'required',
      dataPath: '.resources[0]',
      schemaPath: '#/definitions/resources/required',
      params: { missingProperty: 'url' },
      message: "should have required property 'url'",
    },
    {
      keyword: 'additionalProperties',
      dataPath: '.resources[1]',
      schemaPath: '#/definitions/resources/additionalProperties',
      params: { additionalProperty: 'resource' },
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
