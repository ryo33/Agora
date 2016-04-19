defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    case conn.assigns[:account] do
      nil ->
        signed_in = false
      _account ->
        signed_in = true
    end
    render conn, "index.html", signed_in: signed_in
  end
end
