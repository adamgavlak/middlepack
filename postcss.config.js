var tailwind = require('tailwindcss')

var purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project
  content: [
    './source/**/*.erb',
    './source/**/*.html',
    './source/**/*.html.erb',
  ],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || [];
        }
      },

      extensions: ['html', 'erb', 'html.erb']
    }
  ]
})

module.exports = {
  plugins: [
    tailwind('./tailwind.js'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}