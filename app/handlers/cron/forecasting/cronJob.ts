import { logger } from '@/config/logger'
import { cronMiddleware } from '@/common/middleware'
import { placementForecastingReport } from '@/services/forecasting/placements/placementForecastingReport'
import { segmentForecastingReport } from '@/services/forecasting/segments/segmentForecastingReport'
import { writePlacements } from '@/services/sheets/writePlacements'
import { writeSegments } from '@/services/sheets/writeSegments'

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
  const placementReports = await placementForecastingReport(periodsInDays)

  logger.info('Generating Segment Forecasting Reports...')
  const segmentReports = await segmentForecastingReport(periodsInDays, segmentCombinations)

  logger.info('Writing Placement Forecasting Reports to Google sheets...')
  await writePlacements(placementReports)

  logger.info('Writing Segment Forecasting Reports to Google sheets...')
  await writeSegments(segmentReports)
})
