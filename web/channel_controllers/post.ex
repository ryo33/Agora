defmodule Agora.ChannelController.Post do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", post_params, socket) do
    changeset = Post.changeset(put_info(%Post{}, socket), post_params)
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, post} ->
        post = Repo.preload(post, :user)
        add_post = %{
          type: "ADD_POST",
          post: post
        }
        broadcast_to_thread(post.thread_id, add_post)
        {:ok, socket}
      {:error, _changeset} ->
        {:error, socket} # TODO return error message
    end
  end
end
