defmodule Agora.ChannelController.Thread do
  use Agora.ChannelController

  require Logger

  def handle_action("add", thread_params, socket) do
    account_id = socket.assigns.account.id
    changeset = Thread.changeset(%Thread{
      account_id: account_id,
      user_id: Map.get(socket.assigns, :current_user)
    }, thread_params)

    ^account_id = get(changeset, :account_id)
    true = Account.has_user?(account_id, get(changeset, :user_id))

    case Repo.insert(changeset) do
      {:ok, thread} ->
        if thread.parent_group_id != nil do
          add_thread = %{
            type: "ADD_THREAD",
            thread: thread
          }
          broadcast_to_group(thread.parent_group_id, [add_thread])
        end
        {:ok, %{"id" => thread.id}, socket}
      {:error, changeset} ->
        {:error, socket} # TODO return error message
    end
  end
end
