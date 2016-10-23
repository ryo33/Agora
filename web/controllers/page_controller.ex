defmodule Agora.PageController do
  use Agora.Web, :controller

  plug Agora.AuthenticationPlug

  @max_length 32

  def index(conn, _params) do
    og = %{
    }
    render_page(conn, og)
  end

  def group(conn, %{"id" => id}) do
    group = Agora.Repo.get!(Agora.Group, id)
    og = %{
      title: ellipsize(group.name),
    }
    render_page(conn, og)
  end

  def thread(conn, %{"id" => id}) do
    thread = Agora.Repo.get!(Agora.Thread, id)
    og = %{
      title: ellipsize(thread.title),
    }
    render_page(conn, og)
  end

  def post(conn, %{"id" => id}) do
    post = Agora.Repo.get!(Agora.Post, id)
    og = %{
      title: ellipsize(post.title || post.text),
    }
    render_page(conn, og)
  end

  def user(conn, %{"id" => id}) do
    user = Agora.User
    |> Ecto.Query.where([user], user.uid == ^id)
    |> Agora.Repo.one!()
    og = %{
      title: "#{user.name}@#{user.uid}",
    }
    render_page(conn, og)
  end

  defp render_page(conn, og) do
    case conn.assigns[:account] do
      nil ->
        client = %{
          account: nil
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: false, token: token, og: og
      account ->
        client = %{
          account: account
        }
        token = Phoenix.Token.sign(Agora.Endpoint, "channel", client)
        render conn, "index.html", signed_in: true,
          og: og, token: token, id: client.account.id
    end
  end

  defp get_url(conn) do
    url(conn) <> conn.request_path
  end

  defp ellipsize(text) do
    if String.length(text) > @max_length do
      String.slice(text, 0, @max_length - 1) <> "..."
    else
      text
    end
  end
end
