import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/desk';
import { Preview } from '$lib/desk/Preview';
import {
  CogIcon,
  ControlsIcon,
  HomeIcon,
  LinkIcon,
  TagIcon,
  UserIcon,
} from '@sanity/icons';
import {
  BiNavigation,
  BiCookie,
  BiAtom,
  BiFile,
  BiMailSend,
  BiCodeCurly,
} from 'react-icons/bi';
import { map } from 'rxjs/operators';

import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoLogoPwa } from 'react-icons/io5';
import { LuPaintbrush2 } from 'react-icons/lu';
import { SanityDocument } from 'sanity';

/**
 * Builds desk structure
 * @param {StructureBuilder} S
 * @param {StructureResolverContext} context
 * @return {StructureBuilder} Desk structure
 */
export const deskStructure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  /**
   *
   * @param {string} type - Type of document
   * @param {string} title - Title of list
   * @param {StructureBuilder} S - Structure builder
   * @return {Observable<DocumentBuilder | ListBuilder>}
   */
  function buildStandaloneList(
    type: string,
    title: string,
    S: StructureBuilder,
  ) {
    return context.documentStore
      .listenQuery(`*[_type == "${type}"]`, {}, { throttleTime: 1000 })
      .pipe(
        map((docs: SanityDocument[]) => {
          const doubles: string[] = [];
          const filteredDocs = docs
            .filter((doc, i, a) => {
              if (context.schema.has(doc._type)) {
                // If the document is a draft, check to see if it has a double
                let id = doc._id;
                if (id.startsWith('drafts.')) {
                  id = id.replace('drafts.', '');
                  const i = a.findIndex((doc) => doc._id === id);
                  if (i !== -1) {
                    doubles.push(id);
                  }
                }
                return true;
              }

              return false;
            })
            // Remove non-draft doubles
            // This could be made faster by only looping doubles, but this should be fine for how it's used right now
            .filter((doc) => !doubles.includes(doc._id));

          // If there are no documents, return a default document
          if (filteredDocs.length === 0) {
            return S.documentTypeList(type);
          }

          return S.list()
            .title(title)
            .items(
              filteredDocs
                .map((doc) => doc)
                .sort((a, b) => {
                  // Ensure that the base document is always on top
                  if (a?.__i18n_base && b?.__i18n_base) {
                    return 0;
                  }
                  if (!a?.__i18n_base && b?.__i18n_base) {
                    return -1;
                  }

                  return 1;
                })
                .map((doc) =>
                  S.documentListItem().id(doc._id).schemaType(doc._type),
                ),
            );
        }),
      );
  }

  return S.list()
    .title('Content')
    .items([
      // All base-language posts
      S.listItem()
        .title('Posts')
        .icon(BiFile)
        .child(
          S.documentTypeList('post')
            .filter(`_type == 'post' && !defined(__i18n_base)`)
            .title('Posts'),
        ),
      // All base-language stories
      S.listItem()
        .title('Case Studies')
        .icon(AiOutlineFileSearch)
        .child(
          S.documentTypeList('story')
            .filter(`_type == 'story' && !defined(__i18n_base)`)
            .title('Case Studies'),
        ),
      // All base-language documentation
      S.listItem()
        .title('Documentation')
        .icon(BiCodeCurly)
        .child(
          S.documentTypeList('documentation').filter(
            `_type == 'documentation' && !defined(__i18n_base)`,
          ),
        ),
      S.divider(),
      // Pages
      S.listItem()
        .title('Pages')
        .icon(BiAtom)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon(HomeIcon)
                .child(S.document().schemaType('home').documentId('home')),
              S.listItem()
                .title('News')
                .icon(BiFile)
                .child(S.document().schemaType('news').documentId('news')),
              S.listItem()
                .title('Stories')
                .icon(AiOutlineFileSearch)
                .child(
                  S.document().schemaType('stories').documentId('stories'),
                ),
              S.listItem()
                .title('Newsletter')
                .icon(BiMailSend)
                .child(
                  S.document()
                    .schemaType('newsletter')
                    .documentId('newsletter'),
                ),
              S.listItem()
                .title('Powerful PWAs')
                .icon(IoLogoPwa)
                .child(S.document().schemaType('pwas').documentId('pwas')),
            ]),
        ),

      // Shared documents
      S.listItem()
        .title('Shared')
        .icon(LinkIcon)
        .child(
          S.list()
            .title('Shared')
            .items([
              // Authors
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author').title('Authors')),
              // Tags
              S.listItem()
                .title('Tags')
                .icon(TagIcon)
                .child(S.documentTypeList('tag').title('Tags')),
              // Themes
              S.listItem()
                .title('Themes')
                .icon(LuPaintbrush2)
                .child(S.documentTypeList('theme').title('Themes')),
            ]),
        ),
      S.divider(),

      // Shared documents
      S.listItem()
        .title('Structure')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Structure')
            .items([
              S.listItem()
                .title('Microcopy')
                .icon(ControlsIcon)
                .child(buildStandaloneList('microcopy', 'Microcopy', S)),
              S.listItem()
                .title('Navigation')
                .icon(BiNavigation)
                .child(S.document().schemaType('nav').documentId('nav')),

              S.listItem()
                .title('Cookie Disclaimer')
                .icon(BiCookie)
                .child(buildStandaloneList('cookies', 'Cookie Disclaimer', S)),
            ]),
        ),
    ]);
};

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
