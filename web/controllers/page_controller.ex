defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    case conn.assigns[:account] do
      nil ->
        render conn, "index.html", signed_in: false
      account ->
        client = %{
          account: account,
          conn: conn,
        }
        token = UUID.uuid4(:hex)
        Onetime.register(:channel_token, token, client)
        render conn, "index.html", signed_in: true, token: token, id: client.id
    end
  end
end
