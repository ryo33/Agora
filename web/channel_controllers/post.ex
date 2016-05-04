defmodule Agora.ChannelController.Post do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", post_params, socket) do
    changeset = Post.changeset(put_info(%Post{}, socket), post_params)
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, post} ->
        post = Repo.preload(post, :user)
        query = from p in Agora.Post,
          where: p.thread_id == ^post.thread_id,
          order_by: [desc: p.inserted_at],
          select: p.id
        posts = Repo.all(query)
        post_id = to_string(post.id)
        broadcast_to_thread(post.thread_id, "add_posts", %{
          id: post.thread_id,
          posts_map: %{ post_id => post },
          posts_list: posts
        })
        {:ok, socket}
      {:error, _changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch_thread_contents", %{"id" => id}, socket) do
    id = String.to_integer id
    query = from p in Agora.Post,
      where: p.thread_id == ^id,
      select: p,
      order_by: [desc: p.inserted_at],
      preload: [:user]
    posts = Repo.all(query)
    thread = Repo.one from t in Agora.Thread,
      where: t.id == ^id,
      select: t,
      preload: [:user, :parent_group]
    {:ok, %{thread: thread, posts: posts}, socket} end

  def handle_action("fetch_posts", %{ids: ids}, socket) do
    query = from p in Agora.Post,
      where: p.id in ^ids,
      select: p,
      order_by: [desc: p.inserted_at],
      preload: [:user]
    posts = Repo.all(query)
    {:ok, %{posts: posts}, socket}
  end
end
