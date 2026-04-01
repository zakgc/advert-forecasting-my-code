import { indexService } from './index'

describe('indexService', () => {
  it('returns a welcome message', async () => {
    const result = indexService()

    expect(result).toEqual({
      message: 'Welcome to the Advert Forecasting API'
    })
  })
})
