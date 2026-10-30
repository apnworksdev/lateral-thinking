import {defineField, defineType} from 'sanity'

/**
 * One image or video. Editors pick a single source: an uploaded image,
 * an uploaded video, or a Vimeo link.
 */

type MediaDocument = {
  source?: 'image' | 'file' | 'vimeo'
}

export default defineType({
  name: 'mediaItem',
  title: 'Archivo',
  type: 'object',
  fields: [
    defineField({
      name: 'source',
      title: 'Tipo',
      type: 'string',
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
      hidden: ({parent}) => parent?.source !== 'image',
      validation: (rule) =>
        rule.custom((value, context) => {
          const source = (context.parent as MediaDocument | undefined)?.source
          if (source !== 'image') return true
          if (!value?.asset) return 'Sube una imagen'
          return true
        }),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Es el título que se ve en la galería. En las imágenes, también lo leen quienes no pueden verlas.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Vídeo',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.source !== 'file',
      validation: (rule) =>
        rule.custom((value, context) => {
          const source = (context.parent as MediaDocument | undefined)?.source
          if (source !== 'file') return true
          if (!value?.asset) return 'Sube un vídeo'
          return true
        }),
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Enlace de Vimeo',
      type: 'url',
      description: 'Pega la URL del vídeo, por ejemplo https://vimeo.com/123456789.',
      hidden: ({parent}) => parent?.source !== 'vimeo',
      validation: (rule) =>
        rule.custom((value, context) => {
          const source = (context.parent as MediaDocument | undefined)?.source
          if (source !== 'vimeo') return true
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
  ],
  preview: {
    select: {
      source: 'source',
      media: 'image',
      alt: 'alt',
    },
    prepare({source, media, alt}) {
      if (source === 'vimeo') return {title: alt || 'Vimeo', subtitle: 'Vimeo'}
      if (source === 'file') return {title: alt || 'Vídeo', subtitle: 'Vídeo'}
      return {title: alt || 'Imagen', subtitle: 'Imagen', media}
    },
  },
})
