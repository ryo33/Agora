defmodule Agora.Router do
  use Agora.Web, :router
  require Ueberauth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Agora.AuthenticationPlug
  end

  scope "/", Agora do
    pipe_through :browser

    scope "/auth" do
      get "/logout", AuthController, :delete
      get "/:provider", AuthController, :request
      get "/:provider/callback", AuthController, :callback
      post "/:provider/callback", AuthController, :callback
    end

    get "/groups/:id", PageController, :group
    get "/threads/:id", PageController, :thread
    get "/posts/:id", PageController, :post
    get "/users/:id", PageController, :user
    get "/*page", PageController, :index

    # Unimplemented
    scope "/api", Agora do
      pipe_through :api
      resources "/users", UserController
      resources "/groups", GroupController
      resources "/threads", ThreadController
      resources "/posts", PostController
    end
  end
end
