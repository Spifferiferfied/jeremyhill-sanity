import {defineField, defineType} from 'sanity'
import { mediaAssetSource } from 'sanity-plugin-media'

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
        ],
      }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        sources: [mediaAssetSource],
      },
      validation: rule => rule.required().assetRequired(),
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
      images: 'images',
      des: 'description',
    },
    prepare(selection) {
      const { images, des, title} = selection
      return { title: `${ title } [${ images.length }] `, media: images && images[0], subtitle: des && `${ des[0].children[0].text }` }
    },
  },
})
