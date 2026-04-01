import { siteIds } from './siteIds'
import { zoneIds } from './zoneIds'

export const siteZoneTargeting = async () => {
  const targeting: SiteZoneTargeting[] = []

  for (const siteId of Object.keys(siteIds)) {
    for (const zoneId of Object.keys(zoneIds)) {
      targeting.push({
        SiteId: parseInt(siteId),
        ZoneId: parseInt(zoneId)
      })
    }
  }

  return targeting
}

interface SiteZoneTargeting {
  SiteId: number
  ZoneId: number
}
