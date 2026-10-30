import {CaseIcon, EnvelopeIcon, HomeIcon, ImagesIcon, ProjectsIcon, TagIcon, UsersIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['homePage', 'contactPage', 'usPage', 'servicesPage', 'introPage']
const GROUPED_TYPES = ['project', 'category', 'archiveProject']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Intro')
        .icon(ImagesIcon)
        .child(S.document().schemaType('introPage').documentId('introPage').title('Intro')),
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),
      S.listItem()
        .title('Contact')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact')),
      S.listItem()
        .title('Us')
        .icon(UsersIcon)
        .child(S.document().schemaType('usPage').documentId('usPage').title('Us')),
      S.listItem()
        .title('Servicios')
        .icon(CaseIcon)
        .child(
          S.document().schemaType('servicesPage').documentId('servicesPage').title('Servicios'),
        ),
      S.listItem()
        .title('Work')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title('Work')
            .items([
              S.documentTypeListItem('project').title('Proyectos'),
              S.listItem()
                .title('Categorías')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('Categorías')),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() ?? '') &&
          !GROUPED_TYPES.includes(listItem.getId() ?? ''),
      ),
    ])
