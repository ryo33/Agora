defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    case conn.assigns[:account] do
      nil ->
        account = nil
      account ->
        account = account
    end
    client = %{
      account: account,
      conn: conn,
    }
    token = UUID.uuid4(:hex)
    Onetime.register(:channel_token, token, client)
    render conn, "index.html", token: token
  end
end
