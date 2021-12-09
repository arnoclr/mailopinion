// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Mailopinion',
  plugins: [
    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: [ // locales list
          'fr-fr',
          'en-us'
        ],
        pathAliases: { // path segment alias for each locales
          'fr-fr': 'fr',
          'en-us': 'en'
        },
        fallbackLocale: 'en-us', // fallback language
        defaultLocale: 'en-us', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: true // rewrite default locale, default: true
      }
    }
  ]
}
