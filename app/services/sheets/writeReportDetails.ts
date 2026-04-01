import { type PlacementReportDetails, type SegmentReportDetails } from '@/common/types'
import { update } from '@/services/write/update'

const writePlacementReportDetails = async (placementReportDetails: PlacementReportDetails[]) => {
  const detailsArray = placementReportDetails.map((reportDetails) => {
    return [reportDetails.reportId, reportDetails.days]
  })

  await update('generated_reports!A1', detailsArray)
}

const writeSegmentReportDetails = async (segmentReportDetails: SegmentReportDetails[]) => {
  const detailsArray = segmentReportDetails.map((reportDetails) => {
    return [
      reportDetails.reportId,
      reportDetails.days,
      JSON.stringify(reportDetails.segmentCombination)
    ]
  })

  await update('generated_reports!C1', detailsArray)
}

export const writeReportDetails = async (
  placementReportDetails: PlacementReportDetails[],
  segmentReportDetails: SegmentReportDetails[]
) => {
  await writePlacementReportDetails(placementReportDetails)
  await writeSegmentReportDetails(segmentReportDetails)
}
