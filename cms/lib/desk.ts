import type { ForwardRefExoticComponent } from 'react';
import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  // StructureResolverContext,
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
  // BiCookie,
  BiAtom,
  BiFile,
  BiMailSend,
  BiCodeCurly,
  BiSupport,
} from 'react-icons/bi';
import { RiTodoLine } from 'react-icons/ri';

import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoLogoPwa } from 'react-icons/io5';
import { LuPaintbrush2 } from 'react-icons/lu';
import { SINGLETONS, LANGUAGES } from './constants';

/**
 * Builds i18n structure for singletons
 * @param {string} type - Type of document
 * @param {ForwardRefExoticComponent} icon - Icon component
 * @param {StructureBuilder} S - Structure builder
 * @return {Observable<DocumentBuilder | ListBuilder>}
 */
function buildStandaloneList(
  type: string,
  icon: ForwardRefExoticComponent,
  S: StructureBuilder,
) {
  const item = SINGLETONS.find((item) => item.type === type);
  const title = item?.title || '';
  return S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .id(type)
        .items(
          LANGUAGES.map((lang) =>
            S.documentListItem()
              .schemaType(type)
              .id(type + '-' + lang.id)
              .title(title),
          ),
        )
        .canHandleIntent(
          (intentName, params) =>
            intentName === 'edit' && params.id.startsWith(type),
        ),
    );
}

/**
 * Builds desk structure
 * @param {StructureBuilder} S
 * @param {StructureResolverContext} context
 * @return {StructureBuilder} Desk structure
 */
export const deskStructure = (
  S: StructureBuilder,
  // context: StructureResolverContext,
) => {
  return S.list()
    .title('Content')
    .items([
      // All base-language posts
      S.listItem()
        .title('Posts')
        .icon(BiFile)
        .child(
          S.documentTypeList('post')
            .filter(
              `_type == 'post' && (language == 'en' || !defined(language) || language == 'en_US')`,
            )
            .title('Posts'),
        ),
      // All base-language stories
      S.listItem()
        .title('Case Studies')
        .icon(AiOutlineFileSearch)
        .child(
          S.documentTypeList('story')
            .filter(
              `_type == 'story' && (language == 'en' || !defined(language) || language == 'en_US')`,
            )
            .title('Case Studies'),
        ),
      // All base-language documentation
      S.listItem()
        .title('Documentation')
        .icon(BiCodeCurly)
        .child(
          S.documentTypeList('documentation').filter(
            `_type == 'documentation' && (language == 'en' || !defined(language) || language == 'en_US')`,
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
              buildStandaloneList('home', HomeIcon, S),
              buildStandaloneList('news', BiFile, S),
              buildStandaloneList('stories', AiOutlineFileSearch, S),
              buildStandaloneList('newsletter', BiMailSend, S),
              S.listItem()
                .title('Landing Pages')
                .icon(RiTodoLine)
                .child(
                  S.documentTypeList('landing').filter(
                    `_type == "landing"  && (language == 'en' || !defined(language) || language == 'en_US')`,
                  ),
                ),
              buildStandaloneList('pwas', IoLogoPwa, S),
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
              buildStandaloneList('microcopy', ControlsIcon, S),
              buildStandaloneList('nav', BiNavigation, S),
              // buildStandaloneList('cookies', BiCookie, S),
              buildStandaloneList('app-support', BiSupport, S),
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
