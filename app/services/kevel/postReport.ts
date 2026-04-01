import { gotClient } from '@/config/clients'
import { secrets } from '@/config/secrets'

export const postReport = async (requestBody: object): Promise<string> => {
  const requestURL = 'https://api.kevel.co/v1/forecaster'
  const requestHeaders = {
    'Content-Type': 'application/json',
    'X-Adzerk-ApiKey': secrets.kevelApiKey
  }

  const response = await gotClient(requestURL, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(requestBody)
  })

  if (typeof response.body !== 'string') {
    throw new Error("Kevel response not expected type 'string'")
  }

  const responseBody = JSON.parse(response.body)

  return responseBody.id
}
