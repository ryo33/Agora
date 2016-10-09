defmodule Agora.AccountChannel do
  use Agora.Web, :channel
  alias Agora.User
  alias Agora.Repo

  require Logger

  def join("account:" <> id, _params, socket) do
    account_id = String.to_integer id
    if account_id == socket.assigns.account.id do
      # Users
      query = from p in Agora.User,
        where: p.account_id == ^socket.assigns.account.id,
        select: p.id
      users = Agora.Repo.all(query)
      # Watchlists
      query = from w in Agora.Watchlist,
        where: w.account_id == ^account_id,
        select: w.id,
        order_by: [desc: w.updated_at],
        limit: 100
      watchlists = Repo.all(query)
      {:ok, %{users: users, watchlists: watchlists}, socket}
    else
      {:error, %{reason: "Unmatched ID"}}
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

  def handle_in("users", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.User, socket, action, params)
  end

  def handle_in("webhooks", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.ThreadWebhook, socket, action, params)
  end
end
