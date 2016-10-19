defmodule Agora.AuthController do
  use Agora.Web, :controller
  require Logger
  alias Agora.Account

  plug Ueberauth
  alias Ueberauth.Strategy.Helpers

  def request(conn, _params) do
    render(conn, "request.html", callback_url: Helpers.callback_url(conn))
  end

  def delete(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    # TODO error message
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: %{provider: :google = provider, uid: id}}} = conn, _params) do
    provider = to_string(provider)
    query = from a in Account,
      where: a.provider == ^provider and a.provided_id == ^id,
      limit: 1,
      select: a

    account = case Repo.all(query) do
      [] ->
        changeset = Account.changeset(%Account{}, %{
          provider: provider,
          provided_id: id,
          name: id
        })
        case Repo.insert(changeset) do
          {:ok, account} ->
            Logger.debug "the account was created #{inspect account}"
            account
        end
      [account] ->
        Logger.debug "the account exists #{inspect account}"
        account
    end

    account = account |> Repo.preload(:users)
    conn = conn
           |> put_session(:account, account.id)
    case account.users do
      [] ->
        conn
        |> redirect(to: "/account/add-user")
      _  ->
        conn
        |> redirect(to: "/account/users")
    end
  end
end
