import { type PlacementReportDetails, type SegmentReportDetails } from '@/common/types'
import { writeReportDetails } from '@/services/sheets/writeReportDetails'
import { update } from '@/services/write/update'

jest.mock('@/services/write/update', () => ({
  update: jest.fn().mockResolvedValue('')
}))

describe('writeReportDetails', () => {
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
  const expectedPlacementWriteData = ['placement-report-id', 1]
  const expectedSegmentWriteData = ['segment-report-id', 1, JSON.stringify(['tech-mobile'])]

  it('should call update method for both report types', async () => {
    await writeReportDetails(placementReportDetails, segmentReportDetails)

    expect(update).toHaveBeenCalledWith('generated_reports!A1', [expectedPlacementWriteData])
    expect(update).toHaveBeenCalledWith('generated_reports!C1', [expectedSegmentWriteData])
  })
})
