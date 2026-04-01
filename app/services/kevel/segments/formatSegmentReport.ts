/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SegmentReport, type FormattedSegmentReport } from '@/common/types'
import { siteIds } from '@/services/kevel/support/siteIds'
import moment from 'moment'

export const formatSegmentReport = async (
  report: SegmentReport,
  segment: string,
  periodsInDays: number
): Promise<FormattedSegmentReport[]> => {
  const groupedReports = report.result.grouped || groupReports(report)
  const id = report.id
  const date = moment(report.requestDateTime).format('DD-MM-YYYY')
  const period = `${periodsInDays} day(s)`

  const reports = groupedReports.map((report) => {
    const site = siteIds[report.key.$site] || {
      country: 'unsupported',
      platform: 'unsupported'
    }

    return {
      id,
      date,
      segment,
      period,
      booked: report.values.booked.impressions,
      available: report.values.available.impressions,
      country: site.country,
      platform: site.platform
    }
  })

  const zero = {
    endDateTime: '2024-06-13T14:26:45.338Z',
    progress: 100.0,
    lastUpdateDateTime: '2024-06-13T14:26:45.338Z',
    id: 'uuid',
    status: 'finished',
    resultStatus: 'success',
    desc: 'Forecast is finished',
    requestDateTime: '2024-06-13T14:24:27.238Z',
    result: {
      total: {
        booked: {
          impressions: 0,
          clicks: 0,
          uniqueUsers: 0
        },
        uncapped: {
          impressions: 0,
          clicks: 0,
          uniqueUsers: 0
        },
        available: {
          impressions: 0,
          clicks: 0,
          uniqueUsers: 0
        }
      }
    },
    startDateTime: '2024-06-13T14:26:11.206Z'
  }

  const hero = {
    endDateTime: '2024-06-13T14:26:44.828Z',
    progress: 100.0,
    lastUpdateDateTime: '2024-06-13T14:26:44.828Z',
    id: 'uuid',
    status: 'finished',
    resultStatus: 'success',
    desc: 'Forecast is finished',
    requestDateTime: '2024-06-13T14:24:25.945Z',
    result: {
      total: {
        booked: {
          impressions: 576,
          clicks: 16,
          uniqueUsers: 528
        },
        uncapped: {
          impressions: 2143424,
          clicks: 9832,
          uniqueUsers: 197056
        },
        available: {
          impressions: 2143424,
          clicks: 9832,
          uniqueUsers: 197056
        }
      },
      grouped: [
        {
          values: {
            booked: {
              impressions: 512,
              clicks: 16,
              uniqueUsers: 480
            },
            uncapped: {
              impressions: 2009688,
              clicks: 9560,
              uniqueUsers: 190608
            },
            available: {
              impressions: 2009688,
              clicks: 9560,
              uniqueUsers: 190608
            }
          },
          key: {
            $site: 1279000
          }
        },
        {
          values: {
            booked: {
              impressions: 64,
              clicks: 0,
              uniqueUsers: 48
            },
            uncapped: {
              impressions: 133736,
              clicks: 272,
              uniqueUsers: 9272
            },
            available: {
              impressions: 133736,
              clicks: 272,
              uniqueUsers: 9272
            }
          },
          key: {
            $site: 1278981
          }
        }
      ]
    },
    startDateTime: '2024-06-13T14:26:10.103Z'
  }

  return reports
}

const groupReports = (report: any) => {
  const values = report.result.total

  return [
    {
      values,
      key: {
        $site: 106
      }
    },
    {
      values,
      key: {
        $site: 112
      }
    }
  ]
}
