import { generatePlacementForecastingReports } from '@/services/forecasting/placements/generatePlacementForecastingReports'
import { formatPlacementForecastingReports } from '@/services/forecasting/placements/formatPlacementForecastingReports'

export const placementForecastingReport = async (periodsInDays: number[]) => {
  const placementReports = await generatePlacementForecastingReports(periodsInDays)
  const writeData = await formatPlacementForecastingReports(placementReports)

  return writeData
}
