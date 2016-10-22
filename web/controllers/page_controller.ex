defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  def index(conn, _params) do
    render_page(conn, "")
  end

  def group(conn, %{"id" => id}) do
    render_page(conn, Agora.Group.get_title_text(id))
  end

  def thread(conn, %{"id" => id}) do
    render_page(conn, Agora.Thread.get_title_text(id))
  end

  def post(conn, %{"id" => id}) do
    render_page(conn, Agora.Post.get_title_text(id))
  end

  def user(conn, %{"id" => id}) do
    render_page(conn, Agora.User.get_title_text(id))
  end

  def render_page(conn, title) do
    case conn.assigns[:account] do
      nil ->
        client = %{
          account: nil
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: false, token: token, title: title
      account ->
        client = %{
          account: account
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: true,
          title: title, token: token, id: client.account.id
    end
  end
end
