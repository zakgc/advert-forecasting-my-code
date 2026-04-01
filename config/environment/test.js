// Do not resolve serverless config as called by env-cmd
module.exports = async () => {
  const fetchDefaultConfig = require(`./default.js`)
  const defaultConfig = await fetchDefaultConfig()
  const APP_ENVIRONMENT = 'test'
  const DEPLOYMENT_TYPE = 'live'

  const logging = {
    POWERTOOLS_SERVICE_NAME: `${defaultConfig.PROJECT_NAME}-${APP_ENVIRONMENT}`,
    POWERTOOLS_LOG_LEVEL: 'SILENT',
    POWERTOOLS_DEV: 'true'
  }

  return {
    ...defaultConfig,
    NODE_ENV: 'test',
    APP_ENVIRONMENT,
    DEPLOYMENT_TYPE,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS} --enable-source-maps`,
    NODE_EXTRA_CA_CERTS: '/usr/local/share/ca-certificates/test.crt',
    ...logging
  }
}
