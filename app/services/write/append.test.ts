import { append } from './append'
import { google } from 'googleapis'

jest.mock('googleapis', () => ({
  google: {
    sheets: jest.fn().mockReturnValue({
      spreadsheets: {
        values: {
          append: jest.fn().mockResolvedValue('')
        }
      }
    })
  }
}))

describe('write', () => {
  const sheetId = 'test-google-sheet-id'
  const writeRange = 'test_sheet!A2'
  const writeData = [
    ['this', 'is', 'a', 'test'],
    ['this', 'is', 'a', 'test'],
    ['this', 'is', 'a', 'test']
  ]

  it('should call append method with correct arguments', async () => {
    await append(writeRange, writeData)

    expect(
      google.sheets({ version: 'v4', auth: expect.any(Object) }).spreadsheets.values.append
    ).toHaveBeenCalledWith({
      spreadsheetId: sheetId,
      range: writeRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: writeData
      }
    })
  })
})
