import {EnvelopeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Contact singleton. Same background as the homepage, with a single text.
 * The document id is fixed to "contactPage" in the Studio structure.
 */

type ContactPageDocument = {
  backgroundType?: 'image' | 'file' | 'vimeo'
}

export default defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'backgroundType',
      title: 'Tipo de fondo',
      type: 'string',
      description: 'Elige una sola opción.',
      initialValue: 'image',
      options: {
        layout: 'radio',
        list: [
          {title: 'Imagen', value: 'image'},
          {title: 'Vídeo subido', value: 'file'},
          {title: 'Vimeo', value: 'vimeo'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.backgroundType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para quien no pueda verla.',
          validation: (rule) =>
            rule.custom((value, context) => {
              const backgroundType = (context.document as ContactPageDocument | undefined)
                ?.backgroundType
              if (backgroundType !== 'image') return true
              if (!value) return 'Describe la imagen'
              return true
            }),
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (context.document as ContactPageDocument | undefined)
            ?.backgroundType
          if (backgroundType !== 'image') return true
          if (!value?.asset) return 'Sube una imagen'
          return true
        }),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Imagen móvil',
      type: 'image',
      description: 'Opcional. En el móvil se usa esta. Si la dejas vacía, se usa la imagen principal.',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.backgroundType !== 'image',
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
      name: 'videoFile',
      title: 'Vídeo',
      type: 'file',
      description: 'Reserva esta opción solo para clips breves.',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.backgroundType !== 'file',
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (context.document as ContactPageDocument | undefined)
            ?.backgroundType
          if (backgroundType !== 'file') return true
          if (!value?.asset) return 'Sube un vídeo de fondo'
          return true
        }),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Enlace de Vimeo',
      type: 'url',
      description: 'Pega la URL del vídeo, por ejemplo https://vimeo.com/123456789.',
      hidden: ({parent}) => parent?.backgroundType !== 'vimeo',
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (context.document as ContactPageDocument | undefined)
            ?.backgroundType
          if (backgroundType !== 'vimeo') return true
          if (!value) return 'Pega el enlace del vídeo de Vimeo'
          try {
            const url = new URL(value)
            if (!url.hostname.endsWith('vimeo.com')) return 'El enlace tiene que ser de Vimeo'
          } catch {
            return 'Pega un enlace válido de Vimeo'
          }
          return true
        }),
    }),
    defineField({
      name: 'headline',
      title: 'Texto',
      type: 'array',
      of: [
        defineArrayMember({
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
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {title: 'Contact', media}
    },
  },
})
