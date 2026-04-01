import { secrets } from '@/config/secrets'
import { JWT } from 'google-auth-library'
import { google } from 'googleapis'

export const read = async (readRange: string) => {
  const email = secrets.googleServiceEmail
  const spreadsheetId = secrets.googleSheetId
  const spreadsheetKey = secrets.googlePrivateKey.replaceAll('\\n', '\n')

  const client = new JWT({
    email,
    key: spreadsheetKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  const sheets = google.sheets({ version: 'v4', auth: client })

  const readSheet = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: readRange
  })

  return readSheet.data.values ?? []
}
