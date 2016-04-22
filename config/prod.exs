use Mix.Config

config :agora, Agora.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: "agorademo.herokuapp.com", port: 80],
  cache_static_manifest: "priv/static/manifest.json"

# Do not print debug messages in production
config :logger, level: :info

import_config "prod.secret.exs"
