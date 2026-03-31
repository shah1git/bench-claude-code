import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'body', type: 'textarea' },
    { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true },
    { name: 'productLines', type: 'json' },
  ],
}
