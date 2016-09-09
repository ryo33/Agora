defmodule Agora.AccountChannel do
  use Agora.Web, :channel
  alias Agora.User
  alias Agora.Repo

  require Logger

  def join("account:" <> id, _params, socket) do
    if String.to_integer(id) == socket.assigns.account.id do
      query = from p in Agora.User,
        where: p.account_id == ^socket.assigns.account.id,
        select: p.id
      users = Agora.Repo.all(query)
      {:ok, %{users: users}, socket}
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
          broadcast! socket, "add user", %{user: user.id}
          {:reply, :ok, socket}
        {:error, _changeset} ->
          # TODO Return error message
          {:reply, {:ok, %{actions: []}}, socket}
      end
    else
      {:reply, :error, socket}
    end
  end

  def handle_in("set_current_user", user, socket) do
    if Agora.Account.has_user?(socket.assigns.account.id, user) do
        socket = assign(socket, :current_user, user)
        {:noreply, socket}
    else
        {:noreply, socket}
    end
  end

  def handle_in("threads", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("groups", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Group, socket, action, params)
  end

  def handle_in("posts", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
