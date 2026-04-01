import { z } from 'zod'

export const secretsSchema = z.object({
  sentryDsn: z.string(),
  googleServiceEmail: z.string(),
  googlePrivateKey: z.string(),
  googleSheetId: z.string(),
  kevelApiKey: z.string()
})

export type Secrets = Readonly<z.infer<typeof secretsSchema>>

export const testSecrets: Secrets = {
  sentryDsn: 'https://test-sentry-dsn.com',
  googleServiceEmail: 'test-google-service-email',
  googlePrivateKey: 'test-google-private-key',
  googleSheetId: 'test-google-sheet-id',
  kevelApiKey: 'test-kevel-api-key'
}

export const { secrets } = {
  secrets: testSecrets
}
