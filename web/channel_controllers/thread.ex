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
          group_id = thread.parent_group_id
          thread = Repo.preload(thread, [:user, :parent_group])
          query = from t in Agora.Thread,
          where: t.parent_group_id == ^group_id,
          order_by: [desc: t.inserted_at],
          select: t.id
          threads = Repo.all(query)
          thread_id = to_string(thread.id)
          broadcast_to_group(group_id, "add_threads", %{
            id: group_id,
            threads_map: %{ thread_id => thread },
            threads_list: threads
          })
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
      order_by: [desc: t.updated_at],
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
      order_by: [desc: t.updated_at],
      limit: 100,
      preload: [:user, :parent_group]
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("fetch_group_threads", %{"id" => id}, socket) do
    id = String.to_integer id
    query = from p in Agora.Thread,
      where: p.parent_group_id == ^id,
      select: p,
      order_by: [desc: p.inserted_at],
      preload: [:user, :parent_group]
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("fetch_threads", %{ids: ids}, socket) do
    query = from p in Agora.Thread,
      where: p.id in ^ids,
      select: p,
      order_by: [desc: p.inserted_at],
      preload: [:user, :parent_group]
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end
end
