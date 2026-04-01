export const siteIds: SiteIds = {
  101: { country: 'au', platform: 'app' },
  102: { country: 'ca', platform: 'app' },
  103: { country: 'fr', platform: 'app' },
  104: { country: 'de', platform: 'app' },
  105: { country: 'us', platform: 'app' },
  106: { country: 'uk', platform: 'app' },
  107: { country: 'us', platform: 'web' },
  108: { country: 'de', platform: 'web' },
  109: { country: 'fr', platform: 'web' },
  110: { country: 'ca', platform: 'web' },
  111: { country: 'au', platform: 'web' },
  112: { country: 'uk', platform: 'web' }
}

interface SiteIds {
  [key: number]: {
    country: string
    platform: string
  }
}
