import { type SegmentReportDetails, type FormattedSegmentReport } from '@/common/types'
import { logger } from '@/config/logger'
import { fetchReport } from '@/services/kevel/fetchReport'
import { formatSegmentReport } from '@/services/kevel/segments/formatSegmentReport'

export const formatSegmentForecastingReports = async (segmentReports: SegmentReportDetails[]) => {
  const formattedReports: FormattedSegmentReport[] = []

  for (const segmentReport of segmentReports) {
    const reportId = segmentReport.reportId
    const days = segmentReport.days
    const segmentCombination = segmentReport.segmentCombination.join(' + ')

    logger.info(`Fetching segment report ${reportId} for ${days} days...`)
    const fetchedReport = await fetchReport(reportId)

    logger.info(`Formatting segment report ${reportId} for ${days} days...`)
    const formattedReport = await formatSegmentReport(fetchedReport, segmentCombination, days)

    logger.info(`Segment Report ${reportId} to be added to formattedReports for ${days} days:`)
    formattedReports.push(...formattedReport)
  }

  return formattedReports
}
