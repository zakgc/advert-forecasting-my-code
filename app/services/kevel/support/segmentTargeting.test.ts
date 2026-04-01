/* eslint-disable no-useless-escape */
import { segmentTargeting } from './segmentTargeting'

describe('segmentTargeting', () => {
  const techMobileLogic =
    '($user.interests contains "tech-mobile" or $user.custom.viewed_categories contains "tech-mobile" or $user.custom.issued_categories contains "tech-mobile")'
  const foodDrinkLogic =
    '($user.interests contains "food-drink" or $user.custom.viewed_categories contains "food-drink" or $user.custom.issued_categories contains "food-drink")'
  const femaleFashionLogic =
    '(($user.custom.gender = "female" or $user.custom.gender = "unknown" or $user.custom.gender = null) and ($user.interests contains "fashion" or $user.custom.viewed_categories contains "fashion" or $user.custom.issued_categories contains "fashion"))'

  describe('singular segment', () => {
    it('returns the correct format of the logic', () => {
      const expectedLogic = techMobileLogic
      const result = segmentTargeting(['tech-mobile'])
      expect(result).toEqual(expectedLogic)
    })

    it('returns the correct format of the logic with female-fashion', () => {
      const expectedLogic = femaleFashionLogic
      const result = segmentTargeting(['female-fashion'])
      expect(result).toEqual(expectedLogic)
    })
  })

  describe('multiple segments', () => {
    it('returns the correct format of the logic', () => {
      const expectedLogic = `(${techMobileLogic} and ${foodDrinkLogic})`
      const result = segmentTargeting(['tech-mobile', 'food-drink'])
      expect(result).toEqual(expectedLogic)
    })

    it('returns the correct format of the logic with female-fashion', () => {
      const expectedLogic = `(${femaleFashionLogic} and ${techMobileLogic})`
      const result = segmentTargeting(['female-fashion', 'tech-mobile'])
      expect(result).toEqual(expectedLogic)
    })
  })
})
