import {UsersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Us singleton. A gallery, then as many title-and-text blocks as needed.
 * The document id is fixed to "usPage" in the Studio structure.
 */

const textWithLinks = defineArrayMember({
  type: 'block',
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [],
  marks: {
    decorators: [],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Enlace',
        fields: [
          defineField({
            name: 'href',
            type: 'url',
            title: 'URL',
            description:
              'Un correo se abre en el mail. Puedes pegarlo tal cual: info@lateralthinking.barcelona',
            validation: (rule) =>
              rule.uri({
                allowRelative: true,
                scheme: ['http', 'https', 'mailto', 'tel'],
              }),
          }),
        ],
      },
      {
        name: 'form',
        type: 'object',
        title: 'Formulario',
        fields: [
          defineField({
            name: 'note',
            type: 'string',
            title: 'Nota',
            description: 'Este texto abre el formulario de contacto. No hace falta rellenar nada.',
            readOnly: true,
            initialValue: 'Abre el formulario',
          }),
        ],
      },
    ],
  },
})

export default defineType({
  name: 'usPage',
  title: 'Us',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Galería',
      type: 'array',
      options: {layout: 'grid'},
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Describe la imagen para quien no pueda verla.',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'formTitle',
      title: 'Título del formulario',
      type: 'text',
      rows: 3,
      description: 'El título que aparece al abrir el formulario de contacto.',
    }),
    defineField({
      name: 'sections',
      title: 'Apartados',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'usSection',
          title: 'Apartado',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Texto',
              type: 'array',
              description:
                'Selecciona unas palabras y márcalas como Formulario para que abran el formulario de contacto.',
              of: [textWithLinks],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Apartado'}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Us'}
    },
  },
})
