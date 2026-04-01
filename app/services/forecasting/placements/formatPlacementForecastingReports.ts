import { type PlacementReportDetails, type FormattedPlacementReport } from '@/common/types'
import { logger } from '@/config/logger'
import { fetchReport } from '@/services/kevel/fetchReport'
import { formatPlacementReport } from '@/services/kevel/placements/formatPlacementReport'

export const formatPlacementForecastingReports = async (
  placementReports: PlacementReportDetails[]
) => {
  const formattedReports: FormattedPlacementReport[] = []

  for (const placementReport of placementReports) {
    const reportId = placementReport.reportId
    const days = placementReport.days

    logger.info(`Fetching placement report ${reportId} for ${days} days...`)
    const report = await fetchReport(reportId)

    logger.info(`Formatting placement report ${reportId} for ${days} days...`)
    const formattedReport = await formatPlacementReport(report, days)

    logger.info(`Placement report ${reportId} to be added to formattedReports for ${days} days:`)
    formattedReports.push(...formattedReport)
  }

  return formattedReports
}
