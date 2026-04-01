import { getReport } from '@/services/kevel/getReport'
import { logger } from '@/config/logger'

export const fetchReport = async (id: string, retryLimit = 500) => {
  let retryCount = 0

  while (retryCount < retryLimit) {
    const report = await getReport(id)

    if (report.progress === 100) {
      logger.info(`fetchReport took ${retryCount}/${retryLimit} retries to complete`)
      logger.info(`Report ${id} finished processing`)

      return report
    } else {
      logger.info(
        `Report ${id} is at ${report.progress}% and still processing. Attempt #${retryCount} Retrying in 1 second...`
      )

      await new Promise((resolve) => setTimeout(resolve, 1000))
      retryCount++
    }
  }

  logger.error('Ran out of retries')
  throw new Error('Ran out of retries')
}
