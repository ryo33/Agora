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

  def handle_in("set_current_user", user, socket) do
    query = from p in Agora.User,
      where: p.account_id == ^socket.assigns.account.id and p.id == ^user,
      limit: 1,
      select: count(p.id)
    case Repo.all(query) do
      [1] ->
        set_current_user = %{
          type: "SET_CURRENT_USER",
          user: user
        }
        push socket, "dispatch", %{actions: [set_current_user]}
        socket = assign(socket, :current_user, user)
        {:noreply, socket}
      _ ->
        {:noreply, socket}
    end
  end
end
