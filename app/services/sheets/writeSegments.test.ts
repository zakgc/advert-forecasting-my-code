import { type FormattedSegmentReport } from '@/common/types'
import { writeSegments } from './writeSegments'
import { append } from '@/services/write/append'
import { update } from '@/services/write/update'

jest.mock('@/services/write/append', () => ({
  append: jest.fn().mockResolvedValue('')
}))
jest.mock('@/services/write/update', () => ({
  update: jest.fn().mockResolvedValue('')
}))

describe('writeSegments', () => {
  const formattedSegmentReport: FormattedSegmentReport = {
    id: 'report-id',
    date: '10-04-2022',
    segment: 'tech-mobile',
    period: '7 day(s)',
    booked: 451,
    available: 1984,
    country: 'uk',
    platform: 'app'
  }
  const appendRange = 'raw_segment_data!A2'
  const updateRange = 'daily_segment_data!A2'
  const expectedWriteData = [
    '10-04-2022',
    'tech-mobile',
    '7 day(s)',
    451,
    1984,
    'uk',
    'app',
    'report-id'
  ]

  it('should call append method with correct arguments', async () => {
    await writeSegments([formattedSegmentReport])

    expect(append).toHaveBeenCalledWith(appendRange, [expectedWriteData])
  })

  it('should call update method with correct arguments', async () => {
    await writeSegments([formattedSegmentReport])

    expect(update).toHaveBeenCalledWith(updateRange, [expectedWriteData])
  })
})
