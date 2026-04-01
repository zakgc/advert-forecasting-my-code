import got, { type BeforeRetryHook, type OptionsOfJSONResponseBody } from 'got'
import { logger } from '@/config/logger'

const logRetry: BeforeRetryHook = (options, error, retryCount) => {
  logger.error(`Retrying after error ${error?.code}, retry #: ${retryCount}`)
}

export const gotClient = async (url: string | URL, options: OptionsOfJSONResponseBody = {}) => {
  const extendedGot = got.extend({
    timeout: {
      request: 10000
    },
    hooks: {
      beforeRetry: [logRetry]
    }
  })

  const response = await extendedGot(url, options)
  return response
}
