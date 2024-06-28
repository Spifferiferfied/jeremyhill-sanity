import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alt',
            validation: rule => rule.required(),
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
          {
            name: 'orientation',
            type: 'string',
            title: 'Orientation',
            initialValue: 'landscape',
            options: {
              list: [
                { title: 'Landscape', value: 'landscape' },
                { title: 'Portrait', value: 'portrait'},
              ],
              layout: 'radio',
            },
          }
        ]
      }]
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {
        filter: 'topLevel == true',
      },
    }),
    defineField({
      name: 'subCategories',
      title: 'Sub-Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      blurb: 'blurb',
      slug: 'slug',
    },
    prepare(selection) {
      const { blurb } = selection
      return {...selection, subtitle: blurb && `${ blurb }`}
    },
  },
})
