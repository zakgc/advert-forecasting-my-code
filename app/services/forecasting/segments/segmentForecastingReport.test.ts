import { segmentForecastingReport } from '@/services/forecasting/segments/segmentForecastingReport'
import { formatSegmentForecastingReports } from '@/services/forecasting/segments/formatSegmentForecastingReports'
import { generateSegmentForecastingReports } from '@/services/forecasting/segments/generateSegmentForecastingReports'

jest.mock('@/services/forecasting/segments/generateSegmentForecastingReports', () => ({
  generateSegmentForecastingReports: jest.fn().mockResolvedValue([
    { reportId: 'first-id', days: 30, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'second-id', days: 14, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'third-id', days: 7, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'fourth-id', days: 1, segmentCombination: ['food-drink', 'tech-mobile'] }
  ])
}))

jest.mock('@/services/forecasting/segments/formatSegmentForecastingReports', () => ({
  formatSegmentForecastingReports: jest.fn().mockResolvedValue([
    { segment: 'food-drink + tech-mobile', period: '30 day(s)' },
    { segment: 'food-drink + tech-mobile', period: '14 day(s)' },
    { segment: 'food-drink + tech-mobile', period: '7 day(s)' },
    { segment: 'food-drink + tech-mobile', period: '1 day(s)' }
  ])
}))

describe('segmentForecastingReport', () => {
  it('generates a report for each period', async () => {
    const periodsInDays = [30, 14, 7, 1]
    const segmentCombinations = [['food-drink', 'tech-mobile']]
    const reports = await segmentForecastingReport(periodsInDays, segmentCombinations)

    expect(generateSegmentForecastingReports).toHaveBeenCalledWith(
      periodsInDays,
      segmentCombinations
    )
    expect(formatSegmentForecastingReports).toHaveBeenCalledWith([
      { reportId: 'first-id', days: 30, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'second-id', days: 14, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'third-id', days: 7, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'fourth-id', days: 1, segmentCombination: ['food-drink', 'tech-mobile'] }
    ])

    expect(reports).toEqual([
      { segment: 'food-drink + tech-mobile', period: '30 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '14 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '7 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '1 day(s)' }
    ])
  })
})
