import { handler } from './cronJob'
import { logger } from '@/config/logger'
import { cronEvent } from '@/common/testing/cronEvent'
import { placementForecastingReport } from '@/services/forecasting/placements/placementForecastingReport'
import { segmentForecastingReport } from '@/services/forecasting/segments/segmentForecastingReport'
import { writePlacements } from '@/services/sheets/writePlacements'
import { writeSegments } from '@/services/sheets/writeSegments'

jest.mock('@/services/forecasting/placements/placementForecastingReport', () => ({
  placementForecastingReport: jest.fn()
}))
jest.mock('@/services/forecasting/segments/segmentForecastingReport', () => ({
  segmentForecastingReport: jest.fn()
}))
jest.mock('@/services/sheets/writePlacements', () => ({
  writePlacements: jest.fn()
}))
jest.mock('@/services/sheets/writeSegments', () => ({
  writeSegments: jest.fn()
}))

describe('forecasting handler', () => {
  jest.spyOn(logger, 'info').mockImplementation(() => {})

  describe('placement reports', () => {
    it('logs the generate event', async () => {
      await cronEvent({ handler })

      expect(logger.info).toHaveBeenCalledWith('Generating Placement Forecasting Reports...')
    })

    it('calls the placementForecastingReport service', async () => {
      await cronEvent({ handler })

      expect(placementForecastingReport).toHaveBeenCalled()
    })

    it('logs the write event', async () => {
      await cronEvent({ handler })

      expect(logger.info).toHaveBeenCalledWith(
        'Writing Placement Forecasting Reports to Google sheets...'
      )
    })

    it('calls the writePlacements service', async () => {
      await cronEvent({ handler })

      expect(writePlacements).toHaveBeenCalled()
    })
  })

  describe('segment reports', () => {
    it('logs the generate event', async () => {
      await cronEvent({ handler })

      expect(logger.info).toHaveBeenCalledWith('Generating Segment Forecasting Reports...')
    })

    it('calls the segmentForecastingReport service', async () => {
      await cronEvent({ handler })

      expect(segmentForecastingReport).toHaveBeenCalled()
    })

    it('logs the write event', async () => {
      await cronEvent({ handler })

      expect(logger.info).toHaveBeenCalledWith(
        'Writing Segment Forecasting Reports to Google sheets...'
      )
    })

    it('calls the writeSegments service', async () => {
      await cronEvent({ handler })

      expect(writeSegments).toHaveBeenCalled()
    })
  })
})
