import { siteZoneTargeting } from './siteZoneTargeting'

jest.mock('./siteIds', () => ({
  siteIds: {
    1: { country: 'us', platform: 'app' },
    2: { country: 'uk', platform: 'web' }
  }
}))

jest.mock('./zoneIds', () => ({
  zoneIds: {
    3: 'spotlight',
    4: 'hero'
  }
}))

describe('siteZoneTargeting', () => {
  const usAppId = 1
  const ukWebId = 2
  const spotlightId = 3
  const heroId = 4

  const expectedArray = [
    { SiteId: usAppId, ZoneId: spotlightId },
    { SiteId: usAppId, ZoneId: heroId },
    { SiteId: ukWebId, ZoneId: spotlightId },
    { SiteId: ukWebId, ZoneId: heroId }
  ]

  it('returns an array of site and zone ids', async () => {
    const result = await siteZoneTargeting()
    expect(result).toEqual(expectedArray)
  })
})
