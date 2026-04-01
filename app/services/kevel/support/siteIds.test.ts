import { siteIds } from './siteIds'

describe('siteIds', () => {
  it('returns country au and platform app for 101', () => {
    expect(siteIds[101]).toEqual({ country: 'au', platform: 'app' })
  })

  it('returns country ca and platform app for 102', () => {
    expect(siteIds[102]).toEqual({ country: 'ca', platform: 'app' })
  })

  it('returns country fr and platform app for 103', () => {
    expect(siteIds[103]).toEqual({ country: 'fr', platform: 'app' })
  })

  it('returns country de and platform app for 104', () => {
    expect(siteIds[104]).toEqual({ country: 'de', platform: 'app' })
  })

  it('returns country us and platform app for 105', () => {
    expect(siteIds[105]).toEqual({ country: 'us', platform: 'app' })
  })

  it('returns country uk and platform app for 106', () => {
    expect(siteIds[106]).toEqual({ country: 'uk', platform: 'app' })
  })

  it('returns country us and platform web for 107', () => {
    expect(siteIds[107]).toEqual({ country: 'us', platform: 'web' })
  })

  it('returns country de and platform web for 108', () => {
    expect(siteIds[108]).toEqual({ country: 'de', platform: 'web' })
  })

  it('returns country fr and platform web for 109', () => {
    expect(siteIds[109]).toEqual({ country: 'fr', platform: 'web' })
  })

  it('returns country ca and platform web for 110', () => {
    expect(siteIds[110]).toEqual({ country: 'ca', platform: 'web' })
  })

  it('returns country au and platform web for 111', () => {
    expect(siteIds[111]).toEqual({ country: 'au', platform: 'web' })
  })

  it('returns country uk and platform web for 112', () => {
    expect(siteIds[112]).toEqual({ country: 'uk', platform: 'web' })
  })
})
