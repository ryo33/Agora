defmodule Agora.AuthenticationPlug do
  import Plug.Conn
  import Phoenix.Controller

  def init(default), do: default

  def call(conn, default) do
    id = get_session(conn, :account)
    if id do
      account = Agora.Repo.get!(Agora.Account, id)
      conn
      |> assign(:account, account)
    else
      assign(conn, :account, nil)
    end
  end
end
