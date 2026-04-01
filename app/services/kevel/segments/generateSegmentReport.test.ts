import { generateSegmentReport } from './generateSegmentReport'
import { postReport } from '@/services/kevel/postReport'

jest.mock('@/services/kevel/postReport', () => ({
  postReport: jest.fn().mockResolvedValue('123')
}))

jest.mock('@/services/kevel/support/segmentTargeting', () => ({
  segmentTargeting: jest
    .fn()
    .mockReturnValue(
      '($user.interests = ["tech-mobile"] or $user.custom.viewed_categories = ["tech-mobile"] or $user.custom.issued_categories = ["tech-mobile"])'
    )
}))

describe('generateSegmentReport', () => {
  const mockedDate = '2024-04-14T00:00:00.000Z'

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockedDate))
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const siteZoneTargeting = [{ SiteId: 106 }, { SiteId: 112 }]
  const segmentTargetingArray = ['tech-mobile']
  const expectedTargeting =
    '($user.interests = ["tech-mobile"] or $user.custom.viewed_categories = ["tech-mobile"] or $user.custom.issued_categories = ["tech-mobile"])'

  const requestBody = {
    type: 'available',
    startDate: '2024-04-15T00:00:00',
    endDate: '2024-04-15T23:59:59',
    timeZone: 'UTC',
    targeting: {
      SiteZoneTargeting: siteZoneTargeting,
      CustomTargeting: expectedTargeting
    },
    priority: 2,
    params: {
      sampling: 0,
      responsiveness: 3,
      groupBy: ['$site'],
      dynamicMultiWinnerImpressionRatio: true
    }
  }

  it('calls the postReport service', async () => {
    await generateSegmentReport(segmentTargetingArray, 1)

    expect(postReport).toHaveBeenCalledWith(requestBody)
  })

  it('returns the id of request', async () => {
    const result = await generateSegmentReport(segmentTargetingArray, 1)

    expect(result).toEqual('123')
  })
})
