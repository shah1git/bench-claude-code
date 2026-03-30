import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'price', type: 'number', required: true },
    { name: 'wholeSalePrice', type: 'number' },
    { name: 'vipPrice', type: 'number' },
    { name: 'article', type: 'text', required: true },
    { name: 'xmlId', type: 'text' },
    { name: 'specType', type: 'text' },
    { name: 'formFactor', type: 'text' },
    { name: 'productLine', type: 'text' },
    {
      name: 'specs',
      type: 'json',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'url', type: 'text', required: true },
        { name: 'filename', type: 'text', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'specSchema',
      type: 'json',
      admin: {
        description: 'JSON schema for grouping specs into sections',
      },
    },
    {
      name: 'keySpecs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'article_content',
      type: 'richText',
      admin: {
        description: 'Related article (review, guide, comparison)',
      },
    },
  ],
}
