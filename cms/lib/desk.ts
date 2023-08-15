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

import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoLogoPwa } from 'react-icons/io5';
import { LuPaintbrush2 } from 'react-icons/lu';

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
                .child(
                  S.document().schemaType('microcopy').documentId('microcopy'),
                ),

              S.listItem()
                .title('Navigation')
                .icon(BiNavigation)
                .child(S.document().schemaType('nav').documentId('nav')),

              S.listItem()
                .title('Cookie Disclaimer')
                .icon(BiCookie)
                .child(
                  S.document().schemaType('cookies').documentId('cookies'),
                ),
            ]),
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
