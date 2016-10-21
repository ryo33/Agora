defmodule Agora.ChannelController.Search do
  use Agora.Web, :channel_controller

  @search_limit 0.4

  @group "group"
  @thread "thread"
  @user "user"
  @post "post"

  require Logger
  def handle_action("all", %{"query" => q}, socket) do
    q = "%#{q}%"
    query = from thread in Thread,
      where: ilike(thread.title, ^q),
      order_by: thread.updated_at,
      select: %{type: @thread, id: thread.id, updated_at: thread.updated_at}
    threads = Repo.all(query)

    query = from group in Group,
      where: ilike(group.name, ^q),
      order_by: group.updated_at,
      select: %{type: @group, id: group.id, updated_at: group.updated_at}
    groups = Repo.all(query)

    query = from user in User,
      where: ilike(user.name, ^q) or like(user.uid, ^q),
      order_by: user.updated_at,
      select: %{type: @user, id: user.id, updated_at: user.updated_at}
    users = Repo.all(query)

    query = from post in Post,
      where: ilike(post.text, ^q) or like(post.title, ^q),
      order_by: post.updated_at,
      select: %{type: @post, id: post.id, updated_at: post.updated_at}
    posts = Repo.all(query)
    {:ok, %{items: threads ++ groups ++ users ++ posts}, socket}
  end
end
