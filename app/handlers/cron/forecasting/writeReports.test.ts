import { handler } from '@/handlers/cron/forecasting/writeReports'
import { cronEvent } from '@/common/testing/cronEvent'
import { readReportDetails } from '@/services/sheets/readReportDetails'
import { formatPlacementForecastingReports } from '@/services/forecasting/placements/formatPlacementForecastingReports'
import { formatSegmentForecastingReports } from '@/services/forecasting/segments/formatSegmentForecastingReports'
import { writePlacements } from '@/services/sheets/writePlacements'
import { writeSegments } from '@/services/sheets/writeSegments'

jest.mock('@/services/sheets/readReportDetails', () => ({
  readReportDetails: jest.fn().mockResolvedValue({
    placementReports: [
      {
        reportId: 'placement-report-id',
        days: 1
      }
    ],
    segmentReports: [
      {
        reportId: 'segment-report-id',
        days: 1,
        segmentCombination: ['tech-mobile']
      }
    ]
  })
}))

jest.mock('@/services/forecasting/placements/formatPlacementForecastingReports', () => ({
  formatPlacementForecastingReports: jest
    .fn()
    .mockResolvedValue([{ reportId: 'placement-report-id', days: 1 }])
}))

jest.mock('@/services/forecasting/segments/formatSegmentForecastingReports', () => ({
  formatSegmentForecastingReports: jest
    .fn()
    .mockResolvedValue([
      { reportId: 'segment-report-id', days: 1, segmentCombination: ['tech-mobile'] }
    ])
}))

jest.mock('@/services/sheets/writePlacements', () => ({
  writePlacements: jest.fn()
}))

jest.mock('@/services/sheets/writeSegments', () => ({
  writeSegments: jest.fn()
}))

describe('writeReports handler', () => {
  it('calls the readReportDetails service', async () => {
    await cronEvent({ handler })

    expect(readReportDetails).toHaveBeenCalled()
  })

  it('calls the formatPlacementForecastingReports service', async () => {
    await cronEvent({ handler })

    expect(formatPlacementForecastingReports).toHaveBeenCalled()
  })

  it('calls the formatSegmentForecastingReports service', async () => {
    await cronEvent({ handler })

    expect(formatSegmentForecastingReports).toHaveBeenCalled()
  })

  it('calls the writePlacements service', async () => {
    await cronEvent({ handler })

    expect(writePlacements).toHaveBeenCalled()
  })

  it('calls the writeSegments service', async () => {
    await cronEvent({ handler })

    expect(writeSegments).toHaveBeenCalled()
  })
})
