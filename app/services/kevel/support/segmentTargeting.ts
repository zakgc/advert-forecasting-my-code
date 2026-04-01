/* eslint-disable no-useless-escape */
export const segmentTargeting = (targetingArr: string[]): string => {
  const femaleFashionSegment = `(($user.custom.gender = \"female\" or $user.custom.gender = \"unknown\" or $user.custom.gender = null) and ${categorySegment('fashion')})`

  const formatArr = targetingArr.map((target) => {
    if (target === 'female-fashion') {
      return femaleFashionSegment
    }

    return categorySegment(target)
  })

  if (targetingArr.length === 1) {
    return formatArr.toString()
  }

  return `(${formatArr.join(' and ')})`
}

const categorySegment = (category: string): string => {
  return `($user.interests contains \"${category}\" or $user.custom.viewed_categories contains \"${category}\" or $user.custom.issued_categories contains \"${category}\")`
}
