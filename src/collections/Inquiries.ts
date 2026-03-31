import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'comment', type: 'textarea' },
    { name: 'product', type: 'relationship', relationTo: 'products' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'processing' },
        { label: 'Завершена', value: 'done' },
      ],
      defaultValue: 'new',
    },
  ],
}
