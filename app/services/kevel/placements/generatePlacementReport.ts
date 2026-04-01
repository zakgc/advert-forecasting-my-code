import { siteZoneTargeting } from '@/services/kevel/support/siteZoneTargeting'
import { postReport } from '@/services/kevel/postReport'
import moment from 'moment'

export const generatePlacementReport = async (periodInDays: number) => {
  const startDate = moment().add(1, 'days').format('YYYY-MM-DD')
  const endDate = moment().add(periodInDays, 'days').format('YYYY-MM-DD')
  const targeting = await siteZoneTargeting()
  const requestBody = {
    type: 'available',
    startDate: `${startDate}T00:00:00`,
    endDate: `${endDate}T23:59:59`,
    timeZone: 'UTC',
    targeting: { SiteZoneTargeting: targeting },
    priority: 10,
    params: {
      sampling: 0,
      responsiveness: 3,
      groupBy: ['$site', '$zones'],
      dynamicMultiWinnerImpressionRatio: true
    }
  }

  const reportId = await postReport(requestBody)

  return reportId
}
