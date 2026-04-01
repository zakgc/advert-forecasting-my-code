import { generateSegmentForecastingReports } from '@/services/forecasting/segments/generateSegmentForecastingReports'
import { generateSegmentReport } from '@/services/kevel/segments/generateSegmentReport'

jest.mock('@/services/kevel/segments/generateSegmentReport', () => ({
  generateSegmentReport: jest
    .fn()
    .mockResolvedValueOnce('first-id')
    .mockResolvedValueOnce('second-id')
    .mockResolvedValueOnce('third-id')
    .mockResolvedValueOnce('fourth-id')
}))

describe('generateSegmentForecastingReports', () => {
  it('generates a report for each period', async () => {
    const periodsInDays = [30, 14, 7, 1]
    const segmentCombinations = [['food-drink', 'tech-mobile']]
    const reports = await generateSegmentForecastingReports(periodsInDays, segmentCombinations)

    expect(generateSegmentReport).toHaveBeenCalledWith(segmentCombinations[0], 30)
    expect(generateSegmentReport).toHaveBeenCalledWith(segmentCombinations[0], 14)
    expect(generateSegmentReport).toHaveBeenCalledWith(segmentCombinations[0], 7)
    expect(generateSegmentReport).toHaveBeenCalledWith(segmentCombinations[0], 1)

    expect(reports).toEqual([
      { reportId: 'first-id', days: 30, segmentCombination: segmentCombinations[0] },
      { reportId: 'second-id', days: 14, segmentCombination: segmentCombinations[0] },
      { reportId: 'third-id', days: 7, segmentCombination: segmentCombinations[0] },
      { reportId: 'fourth-id', days: 1, segmentCombination: segmentCombinations[0] }
    ])
  })
})
