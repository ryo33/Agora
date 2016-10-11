defmodule Agora.ChannelController.Post do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", %{"params" => params, "default_user" => default_user}, socket) do
    alias Agora.ThreadUser

    changeset = Post.changeset(%Post{}, put_info(params, socket))
    true = validate_info(changeset, socket)

    if default_user do
      account_id = socket.assigns.account.id
      thread_id = params["thread_id"]
      user_id = params["user_id"]
      id = ThreadUser
      |> where([thread_user],
        thread_user.account_id == ^account_id and
        thread_user.thread_id == ^thread_id)
      |> select([thread_user], thread_user.id)
      |> Repo.one()
      if is_nil(id) do
        thread_user = %ThreadUser{
          account_id: account_id,
          user_id: user_id,
          thread_id: thread_id
        }
        Repo.insert(thread_user)
      else
        thread_user = Repo.get!(ThreadUser, id)
        thread_user = Ecto.Changeset.change(thread_user, user_id: user_id)
        Repo.update(thread_user)
      end
    end

    case Repo.insert(changeset) do
      {:ok, post} ->
        query = from p in Agora.Post,
          where: p.thread_id == ^post.thread_id,
          order_by: [desc: p.id],
          select: p.id
        posts = Repo.all(query)
        broadcast_to_thread(post.thread_id, "add posts", %{
          posts: posts
        })
        Task.start(fn -> Agora.Webhook.handle_post(post, socket) end)
        {:ok, socket}
      {:error, _changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch", ids, socket) do
    posts = Agora.Post
            |> where([p], p.id in ^ids)
            |> select([p], {p.id, p})
            |> Repo.all
            |> Enum.map(fn {k, v} -> {Integer.to_string(k), v} end) |> Enum.into(%{})
    {:ok, %{posts: posts}, socket}
  end
end
