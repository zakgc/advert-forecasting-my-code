import { type PlacementReport, type FormattedPlacementReport } from '@/common/types'
import { formatPlacementReport } from './formatPlacementReport'

describe('formatPlacementReport', () => {
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
  const searchId = 309579
  const ukAppSiteId = 1279000
  const ukAppBookedSearchImpressions = 3
  const ukAppAvailableSearchImpressions = 7
  const usAppSiteId = 1279001
  const usAppBookedSearchImpressions = 30
  const usAppAvailableSearchImpressions = 70
  const unsupportedZone = 4
  const unsupportedSite = 5
  const unsupportedBookedImpressions = 16
  const unsupportedAvailableImpressions = 23
  const metric = 'impressions'
  const days = 7
  const period = '7 day(s)'
  const report: PlacementReport = {
    requestDateTime,
    id,
    result: {
      grouped: [
        {
          key: { $zones: [searchId], $site: ukAppSiteId },
          values: {
            booked: { impressions: ukAppBookedSearchImpressions },
            available: { impressions: ukAppAvailableSearchImpressions }
          }
        },
        {
          key: { $zones: [searchId], $site: usAppSiteId },
          values: {
            booked: { impressions: usAppBookedSearchImpressions },
            available: { impressions: usAppAvailableSearchImpressions }
          }
        },
        {
          key: { $zones: [unsupportedZone], $site: unsupportedSite },
          values: {
            booked: { impressions: unsupportedBookedImpressions },
            available: { impressions: unsupportedAvailableImpressions }
          }
        }
      ]
    }
  }

  const expectedUkAppSearchReport: FormattedPlacementReport = {
    id,
    date,
    metric,
    period,
    booked: ukAppBookedSearchImpressions,
    available: ukAppAvailableSearchImpressions,
    country: 'uk',
    platform: 'app',
    placement: 'search'
  }

  const expectedUsAppSearchReport: FormattedPlacementReport = {
    id,
    date,
    metric,
    period,
    booked: usAppBookedSearchImpressions,
    available: usAppAvailableSearchImpressions,
    country: 'us',
    platform: 'app',
    placement: 'search'
  }

  const unsupportedReport: FormattedPlacementReport = {
    id,
    date,
    metric,
    period,
    booked: unsupportedBookedImpressions,
    available: unsupportedAvailableImpressions,
    country: 'unsupported',
    platform: 'unsupported',
    placement: 'unsupported'
  }

  it('formats the report', async () => {
    const result = await formatPlacementReport(report, days)

    expect(result).toEqual([
      expectedUkAppSearchReport,
      expectedUsAppSearchReport,
      unsupportedReport
    ])
  })
})
