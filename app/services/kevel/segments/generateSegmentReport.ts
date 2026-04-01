import { segmentTargeting } from '@/services/kevel/support/segmentTargeting'
import { postReport } from '@/services/kevel/postReport'
import moment from 'moment'

export const generateSegmentReport = async (
  segmentTargetingArray: string[],
  periodInDays: number
) => {
  const startDate = moment().add(1, 'days').format('YYYY-MM-DD')
  const endDate = moment().add(periodInDays, 'days').format('YYYY-MM-DD')
  const siteZoneTargeting = [{ SiteId: 1279000 }, { SiteId: 1278981 }]
  const targeting = segmentTargeting(segmentTargetingArray)
  const requestBody = {
    type: 'available',
    startDate: `${startDate}T00:00:00`,
    endDate: `${endDate}T23:59:59`,
    timeZone: 'UTC',
    targeting: {
      SiteZoneTargeting: siteZoneTargeting,
      CustomTargeting: targeting
    },
    priority: 2,
    params: {
      sampling: 0,
      responsiveness: 3,
      groupBy: ['$site'],
      dynamicMultiWinnerImpressionRatio: true
    }
  }

  const reportId = await postReport(requestBody)

  return reportId
}
