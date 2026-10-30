import {ArchiveIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A past project listed on the Archive page.
 */

export default defineType({
  name: 'archiveProject',
  title: 'Proyecto de archivo',
  type: 'document',
  icon: ArchiveIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
    }),
    defineField({
      name: 'services',
      title: 'Servicios',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'file',
      title: 'Archivo principal',
      type: 'mediaItem',
    }),
  ],
  orderings: [
    {
      title: 'Fecha, más reciente',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'name', client: 'client', media: 'file.image'},
    prepare({title, client, media}) {
      return {title: title || 'Proyecto', subtitle: client, media}
    },
  },
})
