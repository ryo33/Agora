defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    alias Agora.Thread
    alias Agora.Post
    alias Agora.Member
    alias Agora.Repo

    id = String.to_integer id
    if Thread.exists?(id) do
      query = from p in Post,
        where: p.thread_id == ^id,
        select: p.id,
        order_by: [desc: p.inserted_at]
      posts = Repo.all(query)
      {
        group_id, post_limited
      } = Thread
            |> where([thread], thread.id == ^id)
            |> select([thread], {thread.parent_group_id, thread.post_limited})
            |> Repo.one!()
      members = if post_limited == true and not is_nil(group_id) do
        Member
        |> where([member], member.group_id == ^group_id)
        |> select([member], member.user_id)
        |> Repo.all()
      else
        []
      end
      {:ok, %{posts: posts, members: members}, socket}
    else
      {:error, %{reason: "The ID does not exist"}}
    end
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
