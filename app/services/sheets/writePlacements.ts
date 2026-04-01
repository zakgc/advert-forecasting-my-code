import { type FormattedPlacementReport } from '@/common/types'
import { append } from '@/services/write/append'
import { update } from '@/services/write/update'

const reportToArray = (report: FormattedPlacementReport) => {
  return [
    report.date,
    report.placement,
    report.period,
    report.booked,
    report.available,
    report.country,
    report.platform,
    report.id
  ]
}

export const writePlacements = async (reports: FormattedPlacementReport[]) => {
  const reportArrays = reports.map((report) => {
    return reportToArray(report)
  })

  await append('raw_placement_data!A2', reportArrays)
  await update('daily_placement_data!A2', reportArrays)
}
