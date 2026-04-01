import { generatePlacementReport } from './generatePlacementReport'
import { postReport } from '@/services/kevel/postReport'

jest.mock('@/services/kevel/postReport', () => ({
  postReport: jest.fn().mockResolvedValue('123')
}))

jest.mock('@/services/kevel/support/siteZoneTargeting', () => ({
  siteZoneTargeting: jest.fn().mockResolvedValue([
    { SiteId: 1, ZoneId: 3 },
    { SiteId: 1, ZoneId: 4 },
    { SiteId: 2, ZoneId: 3 },
    { SiteId: 2, ZoneId: 4 }
  ])
}))

describe('generatePlacementReport', () => {
  const mockedDate = '2024-04-14T00:00:00.000Z'

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockedDate))
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const ukAppId = 1
  const usAppId = 2
  const heroId = 3
  const spotlightId = 4
  const expectedTargeting = [
    { SiteId: ukAppId, ZoneId: heroId },
    { SiteId: ukAppId, ZoneId: spotlightId },
    { SiteId: usAppId, ZoneId: heroId },
    { SiteId: usAppId, ZoneId: spotlightId }
  ]

  const requestBody = {
    type: 'available',
    startDate: '2024-04-15T00:00:00',
    endDate: '2024-04-15T23:59:59',
    timeZone: 'UTC',
    targeting: { SiteZoneTargeting: expectedTargeting },
    priority: 10,
    params: {
      sampling: 0,
      responsiveness: 3,
      groupBy: ['$site', '$zones'],
      dynamicMultiWinnerImpressionRatio: true
    }
  }

  it('calls the postReport service', async () => {
    await generatePlacementReport(1)

    expect(postReport).toHaveBeenCalledWith(requestBody)
  })

  it('returns the id of the generated report', async () => {
    const result = await generatePlacementReport(1)

    expect(result).toEqual('123')
  })
})
