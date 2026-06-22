import type { CollectionConfig } from 'payload'
import { uploadToGoogleDrive } from '../hooks/uploadToGoogleDrive'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [uploadToGoogleDrive],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

export default Media
