import { type FormattedSegmentReport } from '@/common/types'
import { append } from '@/services/write/append'
import { update } from '@/services/write/update'

const reportToArray = (report: FormattedSegmentReport) => {
  return [
    report.date,
    report.segment,
    report.period,
    report.booked,
    report.available,
    report.country,
    report.platform,
    report.id
  ]
}

export const writeSegments = async (reports: FormattedSegmentReport[]) => {
  const reportArrays = reports.map((report) => {
    return reportToArray(report)
  })

  await append('raw_segment_data!A2', reportArrays)
  await update('daily_segment_data!A2', reportArrays)
}
