import { getCliClient } from 'sanity/cli';
import { LANGUAGES } from '../lib/constants';

const client = getCliClient();

// Change this to the line from lib/constants.ts that coincides with the singletons you want to create
const SINGLETONS = [{ type: 'guidelines', title: 'Guidelines' }];

/**
 * Creates singletons
 */
async function createSingletons() {
  // TODO: Update this code so that existing content isn't lost
  const documents = SINGLETONS.map((singleton) => {
    const translations = LANGUAGES.map((language) => ({
      _id: `${singleton.type}-${language.id}`,
      _type: singleton.type,
      language: language.id,
    }));

    const metadata = {
      _id: `${singleton.type}-translation-metadata`,
      _type: `translation.metadata`,
      translations: translations.map((translation) => ({
        _key: translation.language,
        value: {
          _type: 'reference',
          _ref: translation._id,
        },
      })),
      schemaTypes: Array.from(
        new Set(translations.map((translation) => translation._type)),
      ),
    };

    return [metadata, ...translations];
  }).flat();

  const transaction = client.transaction();

  documents.forEach((doc) => {
    transaction.createOrReplace(doc);
  });

  await transaction
    .commit()
    .then((res) => {
      // TODO: Update this code to copy the `en` content over on creation
      // eslint-disable-next-line no-console
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

createSingletons();
