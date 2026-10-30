import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Presentation Preview URL
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

export default defineConfig({
  name: 'lateral-thinking-theme',
  title: 'Lateral Thinking',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl,
      resolve: {
        // Maps a URL in the preview to the corresponding Sanity document,
        // so opening /post/my-slug in Presentation opens that post in the sidebar.
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_id == "homePage"`,
          },
          {
            route: '/contact',
            filter: `_id == "contactPage"`,
          },
          {
            route: '/us',
            filter: `_id == "usPage"`,
          },
          {
            route: '/services',
            filter: `_id == "servicesPage"`,
          },
          {
            route: '/work/:slug',
            filter: ({params}) => `_type == "project" && slug.current == "${params.slug}"`,
          },
          {
            route: '/post/:slug',
            filter: ({params}) => `_type == "post" && slug.current == "${params.slug}"`,
          },
        ]),
      },
    }),
    visionTool(),
    codeInput(),
  ],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) =>
            template.templateId !== 'homePage' &&
            template.templateId !== 'contactPage' &&
            template.templateId !== 'usPage' &&
            template.templateId !== 'servicesPage' &&
            template.templateId !== 'introPage',
        )
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      if (
        schemaType === 'homePage' ||
        schemaType === 'contactPage' ||
        schemaType === 'usPage' ||
        schemaType === 'servicesPage' ||
        schemaType === 'introPage'
      ) {
        return prev.filter(
          (action) => action.action !== 'duplicate' && action.action !== 'delete',
        )
      }
      return prev
    },
  },
})
