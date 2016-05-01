defmodule Agora.ChannelController.Thread do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", thread_params, socket) do
    changeset = Thread.changeset(put_info(%Thread{}, socket), thread_params)
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, thread} ->
        Logger.debug "#{inspect thread}"
        if thread.parent_group_id != nil do
          add_thread = %{
            type: "ADD_THREAD",
            thread: thread
          }
          broadcast_to_group(thread.parent_group_id, [add_thread])
        end
        {:ok, %{"id" => thread.id}, socket}
      {:error, changeset} ->
        Logger.debug "#{inspect changeset}"
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("get_by_account", _, socket) do
    account_id = socket.assigns.account.id
    query = from t in Thread,
      where: t.account_id == ^account_id,
      select: t
    threads = Repo.all(query)
    push socket, %{
      type: "SET_ACCOUNT_THREADS",
      threads: threads
    }
    {:ok, socket}
  end
end
