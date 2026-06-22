import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

export const uploadToGoogleDrive = async ({ doc }: { doc: any }) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    const drive = google.drive({ version: 'v3', auth })

    const filePath = path.join(process.cwd(), 'media', doc.filename)
    const fileStream = fs.createReadStream(filePath)

    await drive.files.create({
      requestBody: {
        name: doc.filename,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: doc.mimeType,
        body: fileStream,
      },
      supportsAllDrives: true,
      fields: 'id',
    })

    console.log(`Uploaded ${doc.filename} to Google Drive`)
  } catch (error) {
    console.error('Google Drive upload failed:', error)
  }
}
