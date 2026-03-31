import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'article', type: 'text' },
    { name: 'price', type: 'number' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'specType', type: 'text' },
    { name: 'specs', type: 'json' },
    { name: 'specSchema', type: 'json' },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'url', type: 'text' },
        { name: 'filename', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'videoLinks',
      type: 'array',
      fields: [
        { name: 'url', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },
    {
      name: 'keySpecs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    { name: 'productLine', type: 'text' },
    { name: 'formFactor', type: 'text' },
    { name: 'quantity', type: 'number' },
  ],
}
