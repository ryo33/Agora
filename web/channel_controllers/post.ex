defmodule Agora.ChannelController.Post do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", post_params, socket) do
    IO.inspect(post_params)
    changeset = Post.changeset(%Post{}, put_info(post_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, post} ->
        query = from p in Agora.Post,
          where: p.thread_id == ^post.thread_id,
          order_by: [desc: p.inserted_at],
          select: p.id
        posts = Repo.all(query)
        post_id = to_string(post.id)
        broadcast_to_thread(post.thread_id, "add posts", %{
          posts: posts
        })
        {:ok, socket}
      {:error, _changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch", ids, socket) do
    query = Agora.Post
            |> where([p], p.id in ^ids)
            |> select([p], {p.id, p})
            |> order_by([p], desc: p.inserted_at)
    posts = Repo.all(query) |> Enum.map(fn {k, v} -> {Integer.to_string(k), v} end) |> Enum.into(%{})
    {:ok, %{posts: posts}, socket}
  end
end
