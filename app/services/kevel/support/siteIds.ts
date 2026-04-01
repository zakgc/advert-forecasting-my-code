export const siteIds: SiteIds = {
  1279009: { country: 'au', platform: 'app' },
  1279008: { country: 'ca', platform: 'app' },
  1279007: { country: 'fr', platform: 'app' },
  1279006: { country: 'de', platform: 'app' },
  1279001: { country: 'us', platform: 'app' },
  1279000: { country: 'uk', platform: 'app' },
  1278999: { country: 'us', platform: 'web' },
  1278989: { country: 'de', platform: 'web' },
  1278988: { country: 'fr', platform: 'web' },
  1278985: { country: 'ca', platform: 'web' },
  1278982: { country: 'au', platform: 'web' },
  1278981: { country: 'uk', platform: 'web' }
}

interface SiteIds {
  [key: number]: {
    country: string
    platform: string
  }
}
