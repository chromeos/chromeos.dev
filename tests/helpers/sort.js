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
import test from 'ava';
import { propSort, dateSort } from '../../lib/helpers/sort';

test('Prop Sort - Sorts on a property', t => {
  const input = [
    {
      one: 'b',
    },
    {
      one: 'd',
    },
    {
      one: 'a',
    },
    {
      one: 'c',
    },
  ];

  const expected = [
    {
      one: 'a',
    },
    {
      one: 'b',
    },
    {
      one: 'c',
    },
    {
      one: 'd',
    },
  ];

  t.deepEqual(expected, input.sort(propSort({ prop: 'one' })));
});

test('Prop Sort - Sorts with a fallback', t => {
  const input = [
    {
      one: 'b',
      two: 'e',
    },
    {
      two: 'd',
    },
    {
      one: 'a',
    },
    {
      one: 'c',
    },
  ];

  const expected = [
    {
      one: 'a',
    },
    {
      one: 'b',
      two: 'e',
    },
    {
      one: 'c',
    },
    {
      two: 'd',
    },
  ];

  const sorted = input.sort(
    propSort({
      prop: {
        default: 'one',
        fallback: 'two',
      },
    }),
  );

  t.deepEqual(sorted, expected);
});

test('Prop Sort - Sorts with an object fallback', t => {
  const input = [
    {
      one: {
        val: 'b',
      },
      two: 'e',
    },
    {
      two: 'd',
    },
    {
      one: {
        val: 'a',
      },
    },
    {
      one: {
        val: 'c',
      },
    },
  ];

  const expected = [
    {
      one: {
        val: 'a',
      },
    },
    {
      one: {
        val: 'b',
      },
      two: 'e',
    },
    {
      one: {
        val: 'c',
      },
    },
    {
      two: 'd',
    },
  ];

  const sorted = input.sort(
    propSort({
      prop: {
        default: 'one.val',
        fallback: 'two',
      },
    }),
  );

  t.deepEqual(sorted, expected);
});

test('Date Sort - Works (ascending)', t => {
  const input = [
    {
      title: 'item A',
      data: {
        updated: '2020-04-01T00:00:00.000Z',
      },
      date: '2019-12-26T00:00:00.000Z',
    },
    {
      title: 'item B',
      date: '2020-04-02T00:00:00.000Z',
    },
    {
      title: 'item C',
      data: {
        updated: '2020-05-01T00:00:00.000Z',
      },
      date: '2020-04-01T00:00:00.000Z',
    },
  ];

  const expected = [
    {
      title: 'item A',
      data: {
        updated: '2020-04-01T00:00:00.000Z',
      },
      date: '2019-12-26T00:00:00.000Z',
    },
    {
      title: 'item B',
      date: '2020-04-02T00:00:00.000Z',
    },
    {
      title: 'item C',
      data: {
        updated: '2020-05-01T00:00:00.000Z',
      },
      date: '2020-04-01T00:00:00.000Z',
    },
  ];

  const sorted = input.sort(dateSort);

  t.deepEqual(sorted, expected);
});

test('Date Sort - Works (descending)', t => {
  const input = [
    {
      title: 'item A',
      data: {
        updated: '2020-04-01T00:00:00.000Z',
      },
      date: '2019-12-26T00:00:00.000Z',
    },
    {
      title: 'item B',
      date: '2020-04-02T00:00:00.000Z',
    },
    {
      title: 'item C',
      data: {
        updated: '2020-05-01T00:00:00.000Z',
      },
      date: '2020-04-01T00:00:00.000Z',
    },
  ];

  const expected = [
    {
      title: 'item C',
      data: {
        updated: '2020-05-01T00:00:00.000Z',
      },
      date: '2020-04-01T00:00:00.000Z',
    },

    {
      title: 'item B',
      date: '2020-04-02T00:00:00.000Z',
    },
    {
      title: 'item A',
      data: {
        updated: '2020-04-01T00:00:00.000Z',
      },
      date: '2019-12-26T00:00:00.000Z',
    },
  ];

  const sorted = input.sort(dateSort(false));

  t.deepEqual(sorted, expected);
});
