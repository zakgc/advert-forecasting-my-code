import { type PlacementReportDetails, type SegmentReportDetails } from '@/common/types'
import { readReportDetails } from '@/services/sheets/readReportDetails'
import { read } from '@/services/read/read'

jest.mock('@/services/read/read', () => ({
  read: jest
    .fn()
    .mockResolvedValueOnce([['placement-report-id', 1]])
    .mockResolvedValueOnce([['segment-report-id', 1, JSON.stringify(['tech-mobile'])]])
}))

describe('readReportDetails', () => {
  const placementReportDetails: PlacementReportDetails[] = [
    {
      reportId: 'placement-report-id',
      days: 1
    }
  ]
  const segmentReportDetails: SegmentReportDetails[] = [
    {
      reportId: 'segment-report-id',
      days: 1,
      segmentCombination: ['tech-mobile']
    }
  ]

  it('should call read method and return the correct report details', async () => {
    const reportDetails = await readReportDetails()

    expect(read).toHaveBeenCalledTimes(2)

    expect(reportDetails).toEqual({
      placementReports: placementReportDetails,
      segmentReports: segmentReportDetails
    })
  })
})
