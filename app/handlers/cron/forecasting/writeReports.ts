import { logger } from '@/config/logger'
import { cronMiddleware } from '@/common/middleware'
import { readReportDetails } from '@/services/sheets/readReportDetails'
import { formatPlacementForecastingReports } from '@/services/forecasting/placements/formatPlacementForecastingReports'
import { formatSegmentForecastingReports } from '@/services/forecasting/segments/formatSegmentForecastingReports'
import { writePlacements } from '@/services/sheets/writePlacements'
import { writeSegments } from '@/services/sheets/writeSegments'

export const handler = cronMiddleware(async (_event: unknown, _context: unknown) => {
  logger.info('Fetching Generated Reports Details...')
  const reportDetails = await readReportDetails()
  const placementReportDetails = reportDetails.placementReports
  const segmentReportDetails = reportDetails.segmentReports

  logger.info('Formatting Placement Forecasting Reports...')
  const placementReports = await formatPlacementForecastingReports(placementReportDetails)

  logger.info('Formatting Segment Forecasting Reports...')
  const segmentReports = await formatSegmentForecastingReports(segmentReportDetails)

  logger.info('Writing Placement Forecasting Reports to Google sheets...')
  await writePlacements(placementReports)

  logger.info('Writing Segment Forecasting Reports to Google sheets...')
  await writeSegments(segmentReports)
})
