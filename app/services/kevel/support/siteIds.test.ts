import { siteIds } from './siteIds'

describe('siteIds', () => {
  it('returns country au and platform app for 1279009', () => {
    expect(siteIds[1279009]).toEqual({ country: 'au', platform: 'app' })
  })

  it('returns country ca and platform app for 1279008', () => {
    expect(siteIds[1279008]).toEqual({ country: 'ca', platform: 'app' })
  })

  it('returns country fr and platform app for 1279007', () => {
    expect(siteIds[1279007]).toEqual({ country: 'fr', platform: 'app' })
  })

  it('returns country de and platform app for 1279006', () => {
    expect(siteIds[1279006]).toEqual({ country: 'de', platform: 'app' })
  })

  it('returns country us and platform app for 1279001', () => {
    expect(siteIds[1279001]).toEqual({ country: 'us', platform: 'app' })
  })

  it('returns country uk and platform app for 1279000', () => {
    expect(siteIds[1279000]).toEqual({ country: 'uk', platform: 'app' })
  })

  it('returns country us and platform web for 1278999', () => {
    expect(siteIds[1278999]).toEqual({ country: 'us', platform: 'web' })
  })

  it('returns country de and platform web for 1278989', () => {
    expect(siteIds[1278989]).toEqual({ country: 'de', platform: 'web' })
  })

  it('returns country fr and platform web for 1278988', () => {
    expect(siteIds[1278988]).toEqual({ country: 'fr', platform: 'web' })
  })

  it('returns country ca and platform web for 1278985', () => {
    expect(siteIds[1278985]).toEqual({ country: 'ca', platform: 'web' })
  })

  it('returns country au and platform web for 1278982', () => {
    expect(siteIds[1278982]).toEqual({ country: 'au', platform: 'web' })
  })

  it('returns country uk and platform web for 1278981', () => {
    expect(siteIds[1278981]).toEqual({ country: 'uk', platform: 'web' })
  })
})
