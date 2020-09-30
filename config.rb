# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :livereload

activate :external_pipeline,
  name: :webpack,
  command: build? ? "yarn build" : "yarn watch",
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

ignore "manifest.json"
MANIFEST_PATH = ".webpack/manifest.json"

helpers do
  def pack_path(path)
    manifest = JSON.parse(File.read(MANIFEST_PATH)) if File.exist?(MANIFEST_PATH)
    raise "#{MANIFEST_PATH} is missing." unless manifest

    asset_path = manifest[path]
    raise "Can't find #{path} in manifest. See manifest.json for complete list." unless asset_path

    File.absolute_path(asset_path, '/')
  end
end