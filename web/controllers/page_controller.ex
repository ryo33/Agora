defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    case conn.assigns[:account] do
      nil ->
        client = %{
          account: nil
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: false, token: token
      account ->
        client = %{
          account: account
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: true, token: token, id: client.account.id
    end
  end
end
