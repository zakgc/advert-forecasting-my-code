import { postReport } from './postReport'
import * as gotClientModule from '@/config/clients/gotClient'
import type { Response } from 'got'
import { mock } from 'jest-mock-extended'

jest.mock('@/config/clients/gotClient')

describe('postReport', () => {
  const requestURL = 'https://api.kevel.co/v1/forecaster'
  const requestHeaders = {
    'Content-Type': 'application/json',
    'X-Adzerk-ApiKey': 'test-kevel-api-key'
  }
  const requestBody = {
    body: 'data'
  }

  it('makes a request to the kevel forecasting API', async () => {
    const mockResponse = mock<Response>({ body: JSON.stringify({ id: '123' }) })
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    await postReport(requestBody)

    expect(gotClientModule.gotClient).toHaveBeenCalledWith(requestURL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    })
  })

  it('returns the id of the generated report', async () => {
    const mockResponse = mock<Response>({ body: JSON.stringify({ id: '123' }) })
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    const result = await postReport(requestBody)

    expect(result).toEqual('123')
  })

  it('request returns invalid response type', async () => {
    const mockResponse = mock<Response>({})
    jest.spyOn(gotClientModule, 'gotClient').mockResolvedValue(mockResponse)

    await expect(postReport(requestBody)).rejects.toThrow(
      new Error("Kevel response not expected type 'string'")
    )
  })
})
