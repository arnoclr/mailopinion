// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles/styles.scss'

export default function (Vue, { router, head, isClient, appOptions }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300..400&family=Roboto:wght@300&family=Material+Icons&display=swap'
  }),
  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com'
  }),
  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  }),

  // translations
  appOptions.i18n.setLocaleMessage('fr-fr', require('./locales/fr-fr.json'))
  appOptions.i18n.setLocaleMessage('en-us', require('./locales/en-us.json'))
}
