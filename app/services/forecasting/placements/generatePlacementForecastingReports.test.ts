import { generatePlacementForecastingReports } from '@/services/forecasting/placements/generatePlacementForecastingReports'
import { generatePlacementReport } from '@/services/kevel/placements/generatePlacementReport'

jest.mock('@/services/kevel/placements/generatePlacementReport', () => ({
  generatePlacementReport: jest
    .fn()
    .mockResolvedValueOnce('first-id')
    .mockResolvedValueOnce('second-id')
    .mockResolvedValueOnce('third-id')
    .mockResolvedValueOnce('fourth-id')
}))

describe('generatePlacementForecastingReports', () => {
  it('generates a report for each period', async () => {
    const periodsInDays = [30, 14, 7, 1]
    const reports = await generatePlacementForecastingReports(periodsInDays)

    expect(generatePlacementReport).toHaveBeenCalledWith(30)
    expect(generatePlacementReport).toHaveBeenCalledWith(14)
    expect(generatePlacementReport).toHaveBeenCalledWith(7)
    expect(generatePlacementReport).toHaveBeenCalledWith(1)

    expect(reports).toEqual([
      { reportId: 'first-id', days: 30 },
      { reportId: 'second-id', days: 14 },
      { reportId: 'third-id', days: 7 },
      { reportId: 'fourth-id', days: 1 }
    ])
  })
})
