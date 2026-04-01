/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type PlacementReport, type FormattedPlacementReport } from '@/common/types'
import { siteIds } from '@/services/kevel/support/siteIds'
import { zoneIds } from '@/services/kevel/support/zoneIds'
import moment from 'moment'

export const formatPlacementReport = async (
  report: PlacementReport,
  periodsInDays: number
): Promise<FormattedPlacementReport[]> => {
  const groupedReports = report.result.grouped
  const id = report.id
  const date = moment(report.requestDateTime).format('DD-MM-YYYY')
  const period = `${periodsInDays} day(s)`

  const reports = groupedReports.map((report) => {
    const site = siteIds[report.key.$site] || {
      country: 'unsupported',
      platform: 'unsupported'
    }
    const zone = zoneIds[report.key.$zones[0]] || 'unsupported'

    return {
      id,
      date,
      metric: 'impressions',
      period,
      booked: report.values.booked.impressions,
      available: report.values.available.impressions,
      country: site.country,
      platform: site.platform,
      placement: zone
    }
  })

  return reports
}
