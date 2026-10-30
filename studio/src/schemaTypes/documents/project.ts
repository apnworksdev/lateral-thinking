import {ProjectsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {CategorySelect} from '../../components/CategorySelect'

function blockTitle(value?: {_type?: string; children?: {text?: string}[]}[]) {
  const block = value?.find((item) => item._type === 'block')
  const text = block?.children?.map((child) => child.text).join('') ?? ''
  return text
}

/**
 * A project shown on the Work page and on its own interior page.
 */

export default defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'archive', title: 'Archive'},
    {name: 'work', title: 'Work'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace',
      type: 'slug',
      group: 'general',
      description: 'Se usa en la dirección de la página del proyecto.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'placement',
      title: 'Página',
      type: 'string',
      group: 'general',
      description: 'Elige si el proyecto sale en Work, en Archive o en las dos.',
      initialValue: 'work',
      options: {
        layout: 'radio',
        list: [
          {title: 'Work', value: 'work'},
          {title: 'Archive', value: 'archive'},
          {title: 'Ambos', value: 'both'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      group: 'general',
      description: 'Marca categorías ya creadas en Work → Categorías. Sirven de filtro.',
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
      name: 'location',
      title: 'Lugar',
      type: 'string',
      group: 'archive',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      group: 'archive',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'archive',
      description: 'Es la imagen que sale al pasar el ratón por el proyecto en la página de Archive.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para quien no pueda verla.',
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Servicios',
      type: 'array',
      group: 'archive',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'richText',
      group: 'work',
    }),
    defineField({
      name: 'longDescription',
      title: 'Descripción larga',
      type: 'richText',
      group: 'work',
    }),
    defineField({
      name: 'files',
      title: 'Galería',
      type: 'array',
      group: 'work',
      of: [defineArrayMember({type: 'mediaItem'})],
    }),
    defineField({
      name: 'extras',
      title: 'Elementos extra',
      type: 'array',
      group: 'work',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectExtra',
          title: 'Elemento',
          fields: [
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'richText',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {text: 'text'},
            prepare({text}) {
              return {title: blockTitle(text) || 'Elemento'}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', client: 'client', placement: 'placement', media: 'mainImage'},
    prepare({title, client, placement, media}) {
      const page = placement === 'both' ? 'Work y Archive' : placement === 'archive' ? 'Archive' : 'Work'
      return {title: title || 'Proyecto', subtitle: [page, client].filter(Boolean).join(' · '), media}
    },
  },
})
