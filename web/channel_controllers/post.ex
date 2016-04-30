defmodule Agora.ChannelController.Post do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", post_params, socket) do
    account_id = socket.assigns.account.id
    changeset = Post.changeset(%Post{
      account_id: account_id,
      user_id: Map.get(socket.assigns, :current_user)
    }, post_params)

    ^account_id = get(changeset, :account_id)
    true = Account.has_user?(account_id, get(changeset, :user_id))

    case Repo.insert(changeset) do
      {:ok, post} ->
        add_post = %{
          type: "ADD_POST",
          post: post
        }
        broadcast_to_group(post.group_id, [add_post])
        {:ok, socket}
      {:error, changeset} ->
        {:error, socket} # TODO return error message
    end
  end
end
