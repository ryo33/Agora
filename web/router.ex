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

  scope "/api", Agora do
    pipe_through :api
    resources "/users", UserController
  end

  scope "/", Agora do
    pipe_through :browser

    scope "/auth" do
      get "/:provider", AuthController, :request
      get "/:provider/callback", AuthController, :callback
      post "/:provider/callback", AuthController, :callback
      delete "/logout", AuthController, :delete
    end

    get "/*page", PageController, :index
  end
end
