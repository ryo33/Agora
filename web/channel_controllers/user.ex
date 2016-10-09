defmodule Agora.ChannelController.User do
  use Agora.Web, :channel_controller

  require Logger
  alias Agora.ThreadWebhook
  alias Agora.ThreadWebhookLink

  def handle_action("search", %{"query" => q, "group_id_to_join" => group_id}, socket) do
    q = "%#{q}%"
    joined_users_query = from m in Member,
      where: m.group_id == ^group_id,
      select: m.user_id
    joined_users = Repo.all(joined_users_query)
    query = from u in User,
      select: u.id,
      where: not u.id in ^joined_users,
      where: ilike(u.uid, ^q) or ilike(u.name, ^q),
      order_by: [desc: u.updated_at],
      limit: 10
    users = Repo.all(query)
    {:ok, %{users: users}, socket}
  end

  def handle_action("search", %{"query" => q}, socket) do
    q = "%#{q}%"
    query = from u in User,
      select: u,
      where: ilike(u.uid, ^q) or ilike(u.name, ^q),
      order_by: [desc: u.updated_at],
      limit: 10
    users = Repo.all(query)
    {:ok, %{users: users}, socket}
  end

  def handle_action("search thread webhooks", %{"query" => q, "thread_id" => thread_id}, socket) do
    q = "%#{q}%"
    linked = ThreadWebhookLink
             |> join(:left, [link], webhook in ThreadWebhook, link.thread_webhook_id == webhook.id)
             |> where([link, webhook], link.thread_id == ^thread_id)
             |> select([link, webhook], webhook.id)
             |> Repo.all
    query = from u in User,
      select: u.id,
      join: webhook in ThreadWebhook, on: webhook.user_id == u.id,
      where: not webhook.id in ^linked,
      where: ilike(u.uid, ^q) or ilike(u.name, ^q),
      group_by: u.id,
      limit: 10
    users = Repo.all(query)
    {:ok, %{users: users}, socket}
  end

  def handle_action("exists", %{"query" => query}, socket) do
    exists = Repo.exists(from u in User, where: ilike(u.uid, ^query))
    {:ok, %{exists: exists}, socket}
  end

  def handle_action("fetch", ids, socket) do
    users = Agora.User
            |> where([u], u.id in ^ids)
            |> select([u], {u.id, u})
            |> Repo.all
            |> Enum.map(fn {k, v} -> {Integer.to_string(k), v} end)
            |> Enum.into(%{})
    {:ok, %{users: users}, socket}
  end

  def handle_action("add", user, socket) do
    account_id = socket.assigns.account.id
    user = Map.put(user, "account_id", account_id)
    changeset = User.changeset(%User{}, user)
    case Repo.insert(changeset) do
      {:ok, user} ->
        broadcast_to_account(account_id, "add user", %{user: user.id})
        {:ok, %{}, socket}
      {:error, _changeset} ->
        {:error, socket}
    end
  end
end
