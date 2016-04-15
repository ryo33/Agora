defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    account = conn.assigns[:account]
    render conn, "index.html", acconnt: account
  end
end
