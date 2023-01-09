import { SlugValidationContext } from 'sanity';

/**
 * Validate that the slug is unique across all languages for the document's content type
 * @param {strin} slug = The slug to validate
 * @param {SlugValidationContext} context  - The context of the validation
 * @return {boolean} - Whether the slug is unique across all base languages
 */
export async function isUniqueAcrossBaseLanguages(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id.replace(/^drafts\./, '');
  const type = document?._type;

  // If the document is localized, it should automatically pass
  if (document?.__i18n_base?._ref ? true : false) {
    return true;
  }

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type,
  };

  // Select all documents that:
  //   * Are of this document's type
  // . * Are not this document in draft or published state
  //   * Don't have a localization base (!(__i18n_base._ref in [$draft, $published]) for localizations of this document)
  //   * Have the same slug
  // Reduce the result to just the first item
  // Count the total number of results, and see if it equals 0.
  // This will return a boolean
  const query = `count(*[_type == $type && !(_id in [$draft, $published]) && !defined(__i18n_base) && slug.current == $slug][0...1]) == 0`;

  const result = await client.fetch(query, params);
  return result;
}

/**
 * Determine if the document is a localization
 * @param {SlugValidationContext} context  - The context of the validation
 * @return {boolean} - Whether the slug is a localization
 */
export function isL10n(context: SlugValidationContext) {
  const { document } = context;
  return document?.__i18n_base?._ref ? true : false;
}
