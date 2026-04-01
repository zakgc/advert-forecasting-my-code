import { fetchReport } from './fetchReport'
import { getReport } from '@/services/kevel/getReport'

jest.mock('@/services/kevel/getReport', () => ({
  getReport: jest
    .fn()
    .mockResolvedValueOnce({ progress: 50.0 })
    .mockResolvedValueOnce({ progress: 75.0 })
    .mockResolvedValue({ progress: 100.0 })
}))

describe('fetchReport', () => {
  it('requests the report until the progress is 100', async () => {
    await fetchReport('123')

    expect(getReport).toHaveBeenCalledTimes(3)
  })

  it('returns the response from the kevel reports API', async () => {
    const result = await fetchReport('123')

    expect(result).toEqual({ progress: 100.0 })
  })

  describe('Ran out of retries', () => {
    beforeAll(() => {
      jest.mocked(getReport).mockResolvedValue({ progress: 0 })
    })

    it('raises error', async () => {
      const retriesError = new Error('Ran out of retries')

      await expect(fetchReport('123', 1)).rejects.toThrow(retriesError)
    })
  })
})
