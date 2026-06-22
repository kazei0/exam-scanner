import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

export const uploadToGoogleDrive = async ({ doc }: { doc: any }) => {
  try {
    let auth

    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      // Vercel
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      })
    } else {
      // Local
      auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      })
    }

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
