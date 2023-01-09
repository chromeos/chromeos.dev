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
import { StringRule } from 'sanity';

/**
 * Min/Max validation rule factory
 * @param {number} min
 * @param {number} max
 * @param {boolean} requiredByDefault
 * @return {function(boolean): function(StringRule): StringRule}
 */
export function minMax(min: number, max: number, requiredByDefault = false) {
  return (required = requiredByDefault) => {
    return (Rule: StringRule) => {
      if (required) {
        return Rule.required().min(min).max(max);
      }
      return Rule.min(min).max(max);
    };
  };
}
