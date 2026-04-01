import { type PlacementReportDetails } from '@/common/types'
import { generatePlacementReport } from '@/services/kevel/placements/generatePlacementReport'
import { logger } from '@/config/logger'

export const generatePlacementForecastingReports = async (periodsInDays: number[]) => {
  const placementReports: PlacementReportDetails[] = []

  for (const days of periodsInDays) {
    logger.info(`Generating placement report for ${days} days...`)
    const reportId = await generatePlacementReport(days)

    placementReports.push({
      reportId,
      days
    })
  }

  logger.info('Placement Report Ids', {
    data: placementReports
  })

  return placementReports
}
