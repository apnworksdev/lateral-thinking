import {ProjectsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {CategorySelect} from '../../components/CategorySelect'

/**
 * A project shown on the Work page and on its own interior page.
 */

export default defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace',
      type: 'slug',
      description: 'Se usa en la dirección de la página del proyecto.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Descripción larga',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'paragraph',
          title: 'Párrafo',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {text: 'text'},
            prepare({text}) {
              return {title: text || 'Párrafo'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      description: 'Marca categorías ya creadas en Work → Categorías. Sirven de filtro en la página de Work.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'category'}],
          options: {disableNew: true},
        }),
      ],
      components: {input: CategorySelect},
    }),
    defineField({
      name: 'files',
      title: 'Galería',
      type: 'array',
      of: [defineArrayMember({type: 'mediaItem'})],
    }),
    defineField({
      name: 'extras',
      title: 'Elementos extra',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectExtra',
          title: 'Elemento',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {text: 'text'},
            prepare({text}) {
              return {title: text || 'Elemento'}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', client: 'client', media: 'files.0.image'},
    prepare({title, client, media}) {
      return {title: title || 'Proyecto', subtitle: client, media}
    },
  },
})
