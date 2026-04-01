const generateEnvironmentVariables = require('../environment/test') // eslint-disable-line @typescript-eslint/no-var-requires

// eslint-disable-next-line import/no-default-export
export default async () => {
  process.env.APP_ENVIRONMENT = 'test'

  const environmentVariables = await generateEnvironmentVariables({})

  for (const key in environmentVariables) {
    process.env[key] = `${environmentVariables[key]}`
  }
}
