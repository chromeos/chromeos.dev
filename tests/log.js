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
import sinon from 'sinon';
import { log } from '../site/js/lib/log';

test('Logs non-tables', t => {
  const mock = sinon.mock(console);
  mock
    .expects('log')
    .once()
    .withArgs('Hello');
  log('Hello');
  t.true(mock.verify());
});

test('Logs tables', t => {
  const mock = sinon.mock(console);
  mock
    .expects('table')
    .once(1)
    .withArgs(['Hello', 'World']);
  log(['Hello', 'World']);
  t.true(mock.verify());
});

test('Logs objects', t => {
  const mock = sinon.mock(console);
  mock
    .expects('table')
    .once(1)
    .withArgs({ hello: 'world' });
  log({ hello: 'world' });
  t.true(mock.verify());
});
