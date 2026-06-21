import type { CollectionConfig } from 'payload'

export const ExamPapers: CollectionConfig = {
  slug: 'exam-papers',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}