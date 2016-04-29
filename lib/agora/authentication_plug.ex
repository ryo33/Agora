defmodule Agora.AuthenticationPlug do
  import Plug.Conn
  import Phoenix.Controller

  def init(default), do: default

  def call(conn, default) do
    id = get_session(conn, :account)
    if id do
      case Agora.Repo.get(Agora.Account, id) do
        nil ->
          conn
          |> delete_session(:account)
          |> assign(:account, nil)
        account ->
          conn
          |> assign(:account, account)
      end
    else
      assign(conn, :account, nil)
    end
  end
end
