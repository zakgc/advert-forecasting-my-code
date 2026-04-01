// Do not resolve serverless config as called by env-cmd
module.exports = async () => {
  const PROJECT_NAME = 'advert-forecasting'

  const defaultSentryConfig = {
    SENTRY_ENABLED: 'false'
  }

  const defaultHoneycombConfig = {
    HONEYCOMB_ENABLED: 'false',
    HONEYCOMB_SERVICE_NAME: PROJECT_NAME
  }

  return {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1,
    PARAMETERS_SECRETS_EXTENSION_LOG_LEVEL: 'warn',
    APP_VERSION: 'development',
    PROJECT_NAME,
    ...defaultSentryConfig,
    ...defaultHoneycombConfig
  }
}
