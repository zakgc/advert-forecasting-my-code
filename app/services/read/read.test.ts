import { read } from './read'
import { google } from 'googleapis'

jest.mock('googleapis', () => ({
  google: {
    sheets: jest.fn().mockReturnValue({
      spreadsheets: {
        values: {
          get: jest.fn().mockResolvedValue({
            data: {
              values: [['info']]
            }
          })
        }
      }
    })
  }
}))

describe('read', () => {
  const sheetId = 'test-google-sheet-id'
  const readRange = 'test_sheet!A:A'

  it('should call get method with correct arguments', async () => {
    await read(readRange)

    expect(
      google.sheets({ version: 'v4', auth: expect.any(Object) }).spreadsheets.values.get
    ).toHaveBeenCalledWith({
      spreadsheetId: sheetId,
      range: readRange
    })
  })

  it('should return the data values', async () => {
    const data = await read(readRange)

    expect(data).toEqual([['info']])
  })
})
