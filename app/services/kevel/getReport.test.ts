import { getReport } from './getReport'
import * as gotClientModule from '@/config/clients/gotClient'
import type { Response } from 'got'
import { mock } from 'jest-mock-extended'

jest.mock('@/config/clients/gotClient')

describe('getReport', () => {
  const requestURL = 'https://api.kevel.co/v1/forecaster/123'
  const requestHeaders = {
    'Content-Type': 'application/json',
    'X-Adzerk-ApiKey': 'test-kevel-api-key'
  }

  it('makes a request to the url with headers', async () => {
    const mockResponse = mock<Response>({ body: JSON.stringify({ data: 'data' }) })
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    await getReport('123')

    expect(gotClientModule.gotClient).toHaveBeenCalledWith(requestURL, {
      headers: requestHeaders
    })
  })

  it('returns the body of the report request', async () => {
    const mockResponse = mock<Response>({ body: JSON.stringify({ data: 'data' }) })
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    const result = await getReport('123')

    expect(result).toEqual({ data: 'data' })
  })

  it('request returns invalid response type', async () => {
    const mockResponse = mock<Response>({})
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    await expect(getReport('123')).rejects.toThrow(
      new Error("Kevel response not expected type 'string'")
    )
  })
})
