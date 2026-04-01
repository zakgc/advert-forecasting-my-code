import { zoneIds } from './zoneIds'

describe('zoneIds', () => {
  it('returns spotlight for 201', () => {
    expect(zoneIds[201]).toEqual('spotlight')
  })

  it('returns hero for 202', () => {
    expect(zoneIds[202]).toEqual('hero')
  })

  it('returns featured for 203', () => {
    expect(zoneIds[203]).toEqual('featured')
  })

  it('returns trending_now for 204', () => {
    expect(zoneIds[204]).toEqual('trending_now')
  })

  it('returns premium_search for 205', () => {
    expect(zoneIds[205]).toEqual('premium_search')
  })

  it('returns search for 206', () => {
    expect(zoneIds[206]).toEqual('search')
  })

  it('returns promobox for 207', () => {
    expect(zoneIds[207]).toEqual('promobox')
  })

  it('returns promoted_search for 208', () => {
    expect(zoneIds[208]).toEqual('promoted_search')
  })

  it('returns modal for 209', () => {
    expect(zoneIds[209]).toEqual('modal')
  })

  it('returns new_today for 210', () => {
    expect(zoneIds[210]).toEqual('new_today')
  })

  it('returns sidekick for 211', () => {
    expect(zoneIds[211]).toEqual('sidekick')
  })
})
