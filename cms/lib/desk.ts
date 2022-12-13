import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/desk';
import { Preview } from '$lib/desk/Preview';

/**
 * Builds desk structure
 * @param {StructureBuilder} S
 * @param {StructureResolverContext} context
 * @return {StructureBuilder} Desk structure
 */
export const deskStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title('Content')
    .items([
      // All base-language posts
      S.listItem()
        .title('Posts')
        .child(
          S.documentTypeList('post')
            .filter(`_type == 'post' && !defined(__i18n_base)`)
            .title('Posts'),
        ),
      // All base-language stories
      S.listItem()
        .title('Partner Stories')
        .child(
          S.documentTypeList('story')
            .filter(`_type == 'story' && !defined(__i18n_base)`)
            .title('Partner Stories'),
        ),
      // All base-language documentation
      S.listItem()
        .title('Documentation')
        .child(
          S.documentTypeList('documentation').filter(
            `_type == 'documentation' && !defined(__i18n_base)`,
          ),
        ),
      S.divider(),
      // Shared documents
      S.listItem()
        .title('Shared')
        .child(
          S.list()
            .title('Shared')
            .items([
              // Tags
              S.listItem()
                .title('Tags')
                .child(S.documentTypeList('tag').title('Tags')),
              // Authors
              S.listItem()
                .title('Authors')
                .child(S.documentTypeList('author').title('Authors')),
              // Themes
              S.listItem()
                .title('Themes')
                .child(S.documentTypeList('theme').title('Themes')),
            ]),
        ),
      S.divider(),
      // Meta Documents
      S.listItem()
        .title('Microcopy')
        .child(
          S.documentTypeList('microcopy').filter(
            `_type == 'microcopy' && !defined(__i18n_base)`,
          ),
        ),
    ]);

/**
 * Builds document view structure
 * @param {StructureBuilder} S
 * @param {DefaultDocumentNodeContext} context
 * @return {DocumentBuilder} Document view
 */
export const defaultDocumentNodeResolver = (
  S: StructureBuilder,
  context: DefaultDocumentNodeContext,
) =>
  S.document().views([
    S.view.form(),
    S.view.component(Preview).title('Preview'),
  ]);
