import { type PlacementReportDetails, type SegmentReportDetails } from '@/common/types'
import { read } from '@/services/read/read'

const readPlacementReportDetails = async (): Promise<PlacementReportDetails[]> => {
  const placementReportsArray = await read('generated_reports!A:B')
  const placementReports = placementReportsArray.map((report) => {
    return {
      reportId: report[0],
      days: report[1]
    }
  })

  return placementReports as unknown as PlacementReportDetails[]
}

const readSegmentReportDetails = async (): Promise<SegmentReportDetails[]> => {
  const segmentReportsArray = await read('generated_reports!C:E')
  const segmentReports = segmentReportsArray.map((report) => {
    return {
      reportId: report[0],
      days: report[1],
      segmentCombination: JSON.parse(report[2])
    }
  })

  return segmentReports as unknown as SegmentReportDetails[]
}

export const readReportDetails = async () => {
  const placements = await readPlacementReportDetails()
  const segments = await readSegmentReportDetails()

  return {
    placementReports: placements,
    segmentReports: segments
  }
}
