import { type FormattedPlacementReport } from '@/common/types'
import { writePlacements } from './writePlacements'
import { append } from '@/services/write/append'
import { update } from '@/services/write/update'

jest.mock('@/services/write/append', () => ({
  append: jest.fn().mockResolvedValue('')
}))
jest.mock('@/services/write/update', () => ({
  update: jest.fn().mockResolvedValue('')
}))

describe('writePlacements', () => {
  const formattedReport: FormattedPlacementReport = {
    id: 'report-id',
    date: '10-04-2022',
    metric: 'impressions',
    period: '7 day(s)',
    booked: 300,
    available: 700,
    country: 'uk',
    platform: 'app',
    placement: 'hero'
  }
  const appendRange = 'raw_placement_data!A2'
  const updateRange = 'daily_placement_data!A2'
  const expectedWriteData = ['10-04-2022', 'hero', '7 day(s)', 300, 700, 'uk', 'app', 'report-id']

  it('should call append method with correct arguments', async () => {
    await writePlacements([formattedReport])

    expect(append).toHaveBeenCalledWith(appendRange, [expectedWriteData])
  })

  it('should call update method with correct arguments', async () => {
    await writePlacements([formattedReport])

    expect(update).toHaveBeenCalledWith(updateRange, [expectedWriteData])
  })
})
