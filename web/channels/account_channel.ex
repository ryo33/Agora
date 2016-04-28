defmodule Agora.AccountChannel do
  use Phoenix.Channel
  import Ecto.Query
  alias Agora.User
  alias Agora.Repo

  require Logger

  def join("account:" <> id, _params, socket) do
    if String.to_integer(id) == socket.assigns.account.id do
      users = Agora.Repo.all(
        from p in Agora.User,
        where: p.account_id == ^socket.assigns.account.id,
        select: p
      )
      set_users = %{
        type: "SET_USERS",
        users: users
      }
      {:ok, %{actions: [set_users]}, socket}
    else
      {:error, %{reason: "Unmatched ID"}}
    end
  end

  def handle_in("add_user", user, socket) do
    user = Map.put(user, "account_id", socket.assigns.account.id)
    changeset = User.changeset(%User{}, user)
    if changeset.valid? do
      case Repo.insert(changeset) do
        {:ok, user} ->
          add_user = %{
            type: "ADD_USER",
            user: user
          }
          broadcast! socket, "dispatch", %{actions: [add_user]}
          {:reply, :ok, socket}
        {:error, changeset} ->
          # TODO Return error message
          {:reply, {:ok, %{actions: []}}, socket}
      end
    else
      {:reply, :error, socket}
    end
  end
end
