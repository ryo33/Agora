# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :agora, Agora.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SCkt9haZVEIo+I3eZPRCzEOM+GS+yHiuIhJcLTDuLXURVJILTrWSa325Vf7arQc+",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Agora.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :agora,
  title: "Agora",
  url: "https://agorademo.herokuapp.com",
  source: [url: "https://github.com/ryo33/Agora",
           title: "https://github.com/ryo33/Agora"]

# Authentication
config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, [default_scope: "email"]},
    facebook: {Ueberauth.Strategy.Facebook, [default_scope: "email"]},
    github: {Ueberauth.Strategy.Github, [default_scope: "user"]}
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :agora, ecto_repos: [Agora.Repo]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
