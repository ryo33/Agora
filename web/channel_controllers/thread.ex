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
          broadcast_to_group(thread.parent_group_id, "add_thread", %{thread: thread})
        end
        {:ok, %{"id" => thread.id}, socket}
      {:error, changeset} ->
        Logger.debug "#{inspect changeset}"
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("get", _params, socket) do
    query = from t in Thread,
      select: t,
      limit: 100,
      preload: [:user, :parent_group]
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("get_by_account", _, socket) do
    account_id = socket.assigns.account.id
    query = from t in Thread,
      where: t.account_id == ^account_id,
      select: t,
      limit: 100,
      preload: [:user, :parent_group]
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end
end
