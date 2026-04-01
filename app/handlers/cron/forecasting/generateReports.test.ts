import { handler } from '@/handlers/cron/forecasting/generateReports'
import { cronEvent } from '@/common/testing/cronEvent'
import { generatePlacementForecastingReports } from '@/services/forecasting/placements/generatePlacementForecastingReports'
import { generateSegmentForecastingReports } from '@/services/forecasting/segments/generateSegmentForecastingReports'
import { writeReportDetails } from '@/services/sheets/writeReportDetails'

jest.mock('@/services/forecasting/placements/generatePlacementForecastingReports', () => ({
  generatePlacementForecastingReports: jest.fn().mockResolvedValue([
    { reportId: 'first-id', days: 30 },
    { reportId: 'second-id', days: 14 },
    { reportId: 'third-id', days: 7 },
    { reportId: 'fourth-id', days: 1 }
  ])
}))

jest.mock('@/services/forecasting/segments/generateSegmentForecastingReports', () => ({
  generateSegmentForecastingReports: jest.fn().mockResolvedValue([
    { reportId: 'first-id', days: 30, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'second-id', days: 14, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'third-id', days: 7, segmentCombination: ['food-drink', 'tech-mobile'] },
    { reportId: 'fourth-id', days: 1, segmentCombination: ['food-drink', 'tech-mobile'] }
  ])
}))

jest.mock('@/services/sheets/writeReportDetails', () => ({
  writeReportDetails: jest.fn()
}))

describe('generateReports handler', () => {
  it('calls the generatePlacementForecastingReports service', async () => {
    await cronEvent({ handler })

    expect(generatePlacementForecastingReports).toHaveBeenCalled()
  })

  it('calls the generateSegmentForecastingReports service', async () => {
    await cronEvent({ handler })

    expect(generateSegmentForecastingReports).toHaveBeenCalled()
  })

  it('calls the writeReportDetails service', async () => {
    await cronEvent({ handler })

    expect(writeReportDetails).toHaveBeenCalled()
  })
})
