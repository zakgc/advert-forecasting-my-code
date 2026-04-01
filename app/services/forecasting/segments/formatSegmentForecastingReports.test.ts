import { formatSegmentForecastingReports } from '@/services/forecasting/segments/formatSegmentForecastingReports'
import { formatSegmentReport } from '@/services/kevel/segments/formatSegmentReport'
import { fetchReport } from '@/services/kevel/fetchReport'

jest.mock('@/services/kevel/fetchReport', () => ({
  fetchReport: jest
    .fn()
    .mockResolvedValueOnce({ firstReport: 'firstReport' })
    .mockResolvedValueOnce({ secondReport: 'secondReport' })
    .mockResolvedValueOnce({ thirdReport: 'thirdReport' })
    .mockResolvedValueOnce({ fourthReport: 'fourthReport' })
}))

jest.mock('@/services/kevel/segments/formatSegmentReport', () => ({
  formatSegmentReport: jest
    .fn()
    .mockResolvedValueOnce([{ segment: 'food-drink + tech-mobile', period: '30 day(s)' }])
    .mockResolvedValueOnce([{ segment: 'food-drink + tech-mobile', period: '14 day(s)' }])
    .mockResolvedValueOnce([{ segment: 'food-drink + tech-mobile', period: '7 day(s)' }])
    .mockResolvedValueOnce([{ segment: 'food-drink + tech-mobile', period: '1 day(s)' }])
}))

describe('formatSegmentForecastingReports', () => {
  it('formats report from details', async () => {
    const reports = await formatSegmentForecastingReports([
      { reportId: 'first-id', days: 30, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'second-id', days: 14, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'third-id', days: 7, segmentCombination: ['food-drink', 'tech-mobile'] },
      { reportId: 'fourth-id', days: 1, segmentCombination: ['food-drink', 'tech-mobile'] }
    ])

    expect(fetchReport).toHaveBeenCalledWith('first-id')
    expect(formatSegmentReport).toHaveBeenCalledWith(
      { firstReport: 'firstReport' },
      'food-drink + tech-mobile',
      30
    )

    expect(fetchReport).toHaveBeenCalledWith('second-id')
    expect(formatSegmentReport).toHaveBeenCalledWith(
      { secondReport: 'secondReport' },
      'food-drink + tech-mobile',
      14
    )

    expect(fetchReport).toHaveBeenCalledWith('third-id')
    expect(formatSegmentReport).toHaveBeenCalledWith(
      { thirdReport: 'thirdReport' },
      'food-drink + tech-mobile',
      7
    )

    expect(fetchReport).toHaveBeenCalledWith('fourth-id')
    expect(formatSegmentReport).toHaveBeenCalledWith(
      { fourthReport: 'fourthReport' },
      'food-drink + tech-mobile',
      1
    )

    expect(reports).toEqual([
      { segment: 'food-drink + tech-mobile', period: '30 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '14 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '7 day(s)' },
      { segment: 'food-drink + tech-mobile', period: '1 day(s)' }
    ])
  })
})
