# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :livereload

activate :external_pipeline,
  name: :webpack,
  command: build? ? "npm run build" : "npm run watch",
  source: ".webpack",
  latency: 1

config[:js_dir] = 'assets/javascripts'
config[:css_dir] = 'assets/stylesheets'

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false