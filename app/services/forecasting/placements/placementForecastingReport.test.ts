import { placementForecastingReport } from '@/services/forecasting/placements/placementForecastingReport'
import { formatPlacementForecastingReports } from '@/services/forecasting/placements/formatPlacementForecastingReports'
import { generatePlacementForecastingReports } from '@/services/forecasting/placements/generatePlacementForecastingReports'

jest.mock('@/services/forecasting/placements/generatePlacementForecastingReports', () => ({
  generatePlacementForecastingReports: jest.fn().mockResolvedValue([
    { reportId: 'first-id', days: 30 },
    { reportId: 'second-id', days: 14 },
    { reportId: 'third-id', days: 7 },
    { reportId: 'fourth-id', days: 1 }
  ])
}))

jest.mock('@/services/forecasting/placements/formatPlacementForecastingReports', () => ({
  formatPlacementForecastingReports: jest
    .fn()
    .mockResolvedValue([
      { period: '30 day(s)' },
      { period: '14 day(s)' },
      { period: '7 day(s)' },
      { period: '1 day(s)' }
    ])
}))

describe('placementForecastingReport', () => {
  it('generates a report for each period', async () => {
    const periodsInDays = [30, 14, 7, 1]
    const reports = await placementForecastingReport(periodsInDays)

    expect(generatePlacementForecastingReports).toHaveBeenCalledWith(periodsInDays)
    expect(formatPlacementForecastingReports).toHaveBeenCalledWith([
      { reportId: 'first-id', days: 30 },
      { reportId: 'second-id', days: 14 },
      { reportId: 'third-id', days: 7 },
      { reportId: 'fourth-id', days: 1 }
    ])

    expect(reports).toEqual([
      { period: '30 day(s)' },
      { period: '14 day(s)' },
      { period: '7 day(s)' },
      { period: '1 day(s)' }
    ])
  })
})
