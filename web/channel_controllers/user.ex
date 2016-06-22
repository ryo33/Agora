defmodule Agora.ChannelController.User do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("search", %{"query" => q, "group_id_to_join" => group_id}, socket) do
    q = "%#{q}%"
    joined_users_query = from m in Member,
      where: m.group_id == ^group_id,
      select: m.user_id
    joined_users = Repo.all(joined_users_query)
    query = from u in User,
      select: u,
      where: not u.id in ^joined_users,
      where: like(u.uid, ^q) or like(u.name, ^q),
      order_by: [desc: u.updated_at],
      limit: 10
    users = Repo.all(query)
    {:ok, %{users: users}, socket}
  end

  def handle_action("search", %{"query" => q}, socket) do
    q = "%#{q}%"
    query = from u in User,
      select: u,
      where: like(u.uid, ^q) or like(u.name, ^q),
      order_by: [desc: u.updated_at],
      limit: 10
    users = Repo.all(query)
    {:ok, %{users: users}, socket}
  end
end
