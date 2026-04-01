import { formatPlacementForecastingReports } from '@/services/forecasting/placements/formatPlacementForecastingReports'
import { formatPlacementReport } from '@/services/kevel/placements/formatPlacementReport'
import { fetchReport } from '@/services/kevel/fetchReport'

jest.mock('@/services/kevel/fetchReport', () => ({
  fetchReport: jest
    .fn()
    .mockResolvedValueOnce({ firstReport: 'firstReport' })
    .mockResolvedValueOnce({ secondReport: 'secondReport' })
    .mockResolvedValueOnce({ thirdReport: 'thirdReport' })
    .mockResolvedValueOnce({ fourthReport: 'fourthReport' })
}))

jest.mock('@/services/kevel/placements/formatPlacementReport', () => ({
  formatPlacementReport: jest
    .fn()
    .mockResolvedValueOnce([{ period: '30 day(s)' }])
    .mockResolvedValueOnce([{ period: '14 day(s)' }])
    .mockResolvedValueOnce([{ period: '7 day(s)' }])
    .mockResolvedValueOnce([{ period: '1 day(s)' }])
}))

describe('formatPlacementForecastingReports', () => {
  it('formats report from details', async () => {
    const reports = await formatPlacementForecastingReports([
      { reportId: 'first-id', days: 30 },
      { reportId: 'second-id', days: 14 },
      { reportId: 'third-id', days: 7 },
      { reportId: 'fourth-id', days: 1 }
    ])

    expect(fetchReport).toHaveBeenCalledWith('first-id')
    expect(formatPlacementReport).toHaveBeenCalledWith({ firstReport: 'firstReport' }, 30)

    expect(fetchReport).toHaveBeenCalledWith('second-id')
    expect(formatPlacementReport).toHaveBeenCalledWith({ secondReport: 'secondReport' }, 14)

    expect(fetchReport).toHaveBeenCalledWith('third-id')
    expect(formatPlacementReport).toHaveBeenCalledWith({ thirdReport: 'thirdReport' }, 7)

    expect(fetchReport).toHaveBeenCalledWith('fourth-id')
    expect(formatPlacementReport).toHaveBeenCalledWith({ fourthReport: 'fourthReport' }, 1)

    expect(reports).toEqual([
      { period: '30 day(s)' },
      { period: '14 day(s)' },
      { period: '7 day(s)' },
      { period: '1 day(s)' }
    ])
  })
})
