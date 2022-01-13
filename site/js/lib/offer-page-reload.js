/**
 * Copyright 2021 Google LLC
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
import { SnackbarArea } from '../components/snackbar';
import { getData } from './data';
import { preferences } from 'service-worker-i18n-redirect/preferences';

/**
 * Adds snackbar to offer reload to users when a new version of the content is cached
 *
 * @return {Void}
 */
export async function offerPageReload() {
  const language = await preferences.get('lang');
  const microcopy = await getData('microcopy', language);
  const snackbar = new SnackbarArea();
  snackbar.add(microcopy.sw.page, {
    text: microcopy.sw.reload,
    cb: () => window.location.reload(),
  });
}
