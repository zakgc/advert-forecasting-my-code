import { type SegmentReportDetails } from '@/common/types'
import { generateSegmentReport } from '@/services/kevel/segments/generateSegmentReport'
import { logger } from '@/config/logger'

export const generateSegmentForecastingReports = async (
  periodsInDays: number[],
  segmentCombinations: string[][]
) => {
  const segmentReports: SegmentReportDetails[] = []

  for (const days of periodsInDays) {
    for (const segmentCombination of segmentCombinations) {
      logger.info(`Generating segment report for ${days} days...`)
      const reportId = await generateSegmentReport(segmentCombination, days)

      segmentReports.push({
        reportId,
        days,
        segmentCombination
      })
    }
  }

  logger.info('Segment Report Ids', {
    data: segmentReports
  })

  return segmentReports
}
