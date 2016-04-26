use Mix.Config

config :agora, Agora.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "agorademo.herokuapp.com", port: 80],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json"

# Do not print debug messages in production
config :logger, level: :info

import_config "prod.secret.exs"
