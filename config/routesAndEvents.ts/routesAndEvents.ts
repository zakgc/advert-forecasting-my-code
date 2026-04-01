import type { ServerlessFunction } from '@/config/serverless'

export const routesAndEvents: ServerlessFunction[] = [
  {
    name: 'GenerateReportsCronJob',
    handler: 'app/handlers/cron/forecasting/generateReports.handler',
    reservedConcurrency: 1,
    warmup: {
      default: {
        enabled: false
      }
    },
    events: [
      {
        schedule: 'cron(0 1 * * ? *)'
      }
    ],
    timeout: 900
  },
  {
    name: 'WriteReportsCronJob',
    handler: 'app/handlers/cron/forecasting/writeReports.handler',
    reservedConcurrency: 1,
    warmup: {
      default: {
        enabled: false
      }
    },
    events: [
      {
        schedule: 'cron(0 2 * * ? *)'
      }
    ],
    timeout: 900
  }
]
