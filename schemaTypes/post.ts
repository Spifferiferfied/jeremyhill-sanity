import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: rule => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: rule => rule.required(),
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
      ]
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      validation: rule => rule.required(),
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
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
