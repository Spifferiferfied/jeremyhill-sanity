import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { codeInput } from '@sanity/code-input'
import { media } from 'sanity-plugin-media'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET


export default defineConfig({
  name: 'default',
  title: 'jeremy-hill',

  projectId: projectId as string,
  dataset: dataset || 'development',

  plugins: [structureTool(), visionTool(), codeInput(), media()],

  schema: {
    types: schemaTypes,
  },
})
