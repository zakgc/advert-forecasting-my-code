import { zoneIds } from './zoneIds'

describe('zoneIds', () => {
  it('returns spotlight for 309573', () => {
    expect(zoneIds[309573]).toEqual('spotlight')
  })

  it('returns hero for 309574', () => {
    expect(zoneIds[309574]).toEqual('hero')
  })

  it('returns featured for 309575', () => {
    expect(zoneIds[309575]).toEqual('featured')
  })

  it('returns trending_now for 309577', () => {
    expect(zoneIds[309577]).toEqual('trending_now')
  })

  it('returns premium_search for 309578', () => {
    expect(zoneIds[309578]).toEqual('premium_search')
  })

  it('returns search for 309579', () => {
    expect(zoneIds[309579]).toEqual('search')
  })

  it('returns promobox for 309580', () => {
    expect(zoneIds[309580]).toEqual('promobox')
  })

  it('returns promoted_search for 309581', () => {
    expect(zoneIds[309581]).toEqual('promoted_search')
  })

  it('returns modal for 309572', () => {
    expect(zoneIds[309572]).toEqual('modal')
  })

  it('returns new_today for 310889', () => {
    expect(zoneIds[310889]).toEqual('new_today')
  })

  it('returns sidekick for 313248', () => {
    expect(zoneIds[313248]).toEqual('sidekick')
  })
})
