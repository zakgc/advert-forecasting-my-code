import { generateSegmentForecastingReports } from '@/services/forecasting/segments/generateSegmentForecastingReports'
import { formatSegmentForecastingReports } from '@/services/forecasting/segments/formatSegmentForecastingReports'

export const segmentForecastingReport = async (
  periodsInDays: number[],
  segmentCombinations: string[][]
) => {
  const segmentReports = await generateSegmentForecastingReports(periodsInDays, segmentCombinations)
  const writeData = await formatSegmentForecastingReports(segmentReports)

  return writeData
}
