defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    alias Agora.Thread
    alias Agora.Post
    alias Agora.Member
    alias Agora.ThreadUser
    alias Agora.Repo

    account = Map.get(socket.assigns, :account)
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
      default_user = if not is_nil(account) do
        ThreadUser
        |> where([thread_user],
          thread_user.account_id == ^account.id and
          thread_user.thread_id == ^id)
        |> select([thread_user], thread_user.user_id)
        |> Repo.one()
      else
        nil
      end
      members = if post_limited == true and not is_nil(group_id) do
        Member
        |> where([member], member.group_id == ^group_id)
        |> select([member], member.user_id)
        |> Repo.all()
      else
        []
      end
      {:ok, %{posts: posts, members: members, default_user: default_user}, socket}
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
