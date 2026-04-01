import { logger } from '@/config/logger'
import { cronMiddleware } from '@/common/middleware'
import { generatePlacementForecastingReports } from '@/services/forecasting/placements/generatePlacementForecastingReports'
import { generateSegmentForecastingReports } from '@/services/forecasting/segments/generateSegmentForecastingReports'
import { writeReportDetails } from '@/services/sheets/writeReportDetails'

export const handler = cronMiddleware(async (_event: unknown, _context: unknown) => {
  const periodsInDays = [30, 14, 7, 1]
  const segmentCombinations = [
    ['female-fashion', 'food-drink', 'tech-mobile'],
    ['female-fashion', 'food-drink'],
    ['female-fashion', 'tech-mobile'],
    ['female-fashion'],
    ['food-drink', 'tech-mobile'],
    ['food-drink'],
    ['tech-mobile']
  ]

  logger.info('Generating Placement Forecasting Reports...')
  const placementReports = await generatePlacementForecastingReports(periodsInDays)

  logger.info('Generating Segment Forecasting Reports...')
  const segmentReports = await generateSegmentForecastingReports(periodsInDays, segmentCombinations)

  logger.info('Writing report details to sheet...')
  await writeReportDetails(placementReports, segmentReports)
})
