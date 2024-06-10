import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1ktq6360',
    dataset: process.env.SANITY_ENV || 'development'
  }
})
