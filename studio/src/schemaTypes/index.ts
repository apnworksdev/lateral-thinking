import archiveProject from './documents/archiveProject'
import category from './documents/category'
import contactPage from './documents/contactPage'
import homePage from './documents/homePage'
import introPage from './documents/introPage'
import project from './documents/project'
import servicesPage from './documents/servicesPage'
import usPage from './documents/usPage'
import post from './documents/post'
import blockContent from './objects/blockContent'
import mediaItem from './objects/mediaItem'
import seo from './objects/seo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  homePage,
  contactPage,
  usPage,
  servicesPage,
  introPage,
  project,
  category,
  archiveProject,
  post,
  blockContent,
  mediaItem,
  seo,
]
