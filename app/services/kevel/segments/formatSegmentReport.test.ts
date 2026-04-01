import { type SegmentReport, type FormattedSegmentReport } from '@/common/types'
import { formatSegmentReport } from './formatSegmentReport'

describe('formatSegmentReport', () => {
  const requestDateTime = '2024-04-14T00:00:00Z'

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(requestDateTime))
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const id = '123'
  const date = '14-04-2024'
  const ukAppSiteId = 1279000
  const ukWebSiteId = 1278981
  const ukAppBooked = 108
  const ukAppAvailable = 2077
  const ukWebBooked = 451
  const ukWebAvailable = 2001
  const segment = 'tech-mobile'
  const days = 7
  const period = '7 day(s)'
  const report: SegmentReport = {
    id,
    requestDateTime,
    result: {
      grouped: [
        {
          key: { $site: ukAppSiteId },
          values: {
            booked: { impressions: ukAppBooked },
            available: { impressions: ukAppAvailable }
          }
        },
        {
          key: { $site: ukWebSiteId },
          values: {
            booked: { impressions: ukWebBooked },
            available: { impressions: ukWebAvailable }
          }
        }
      ]
    }
  }

  const expectedUkAppSearchReport: FormattedSegmentReport = {
    id,
    date,
    segment,
    period,
    booked: ukAppBooked,
    available: ukAppAvailable,
    country: 'uk',
    platform: 'app'
  }

  const expectedUkWebSearchReport: FormattedSegmentReport = {
    id,
    date,
    segment,
    period,
    booked: ukWebBooked,
    available: ukWebAvailable,
    country: 'uk',
    platform: 'web'
  }

  it('formats the report', async () => {
    const result = await formatSegmentReport(report, segment, days)

    expect(result).toEqual([expectedUkAppSearchReport, expectedUkWebSearchReport])
  })
})
