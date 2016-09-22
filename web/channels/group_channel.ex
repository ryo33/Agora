defmodule Agora.GroupChannel do
  use Agora.Web, :channel

  def join("group:" <> id, _params, socket) do
    if Agora.Group.exists?(id) do
      query = from m in Agora.Member,
        where: m.group_id == ^id,
        select: m.user_id,
        order_by: [desc: m.updated_at],
        limit: 100
      members = Repo.all(query)
      {:ok, %{members: members}, socket}
    else
      {:error, %{reason: "ID does not exist"}}
    end
  end

  def handle_in("groups", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Group, socket, action, params)
  end

  def handle_in("members", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Member, socket, action, params)
  end

  def handle_in("threads", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("posts", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
