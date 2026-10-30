import {ImagesIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Intro singleton. Images used only by the site intro, not by Us.
 * The document id is fixed to "introPage" in the Studio structure.
 */

export default defineType({
  name: 'introPage',
  title: 'Intro',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Imágenes',
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
  ],
  preview: {
    prepare() {
      return {title: 'Intro'}
    },
  },
})
