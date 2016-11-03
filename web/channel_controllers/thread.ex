defmodule Agora.ChannelController.Thread do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", thread_params, socket) do
    changeset = Thread.changeset(%Thread{}, put_info(thread_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, thread} ->
        group_id = thread.parent_group_id
        if group_id != nil do
          query = from t in Thread,
            where: t.parent_group_id == ^group_id,
            order_by: [desc: t.inserted_at],
            select: t.id
          threads = Repo.all(query)
          broadcast_to_group(group_id, "add threads", %{
            threads: threads
          })
        end
        log_data = %{
          title: thread.title
        }
        |> Poison.encode!()
        ThreadLog.log(thread.id, "add", log_data)
        {:ok, %{"id" => thread.id}, socket}
      {:error, changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("edit", %{"id" => id, "params" => params}, socket) do
    # TODO Check if the user is the owner"

    thread = Repo.get!(Thread, id)
    changeset = Thread.changeset(thread, params)
    true = validate_info(changeset, socket)

    thread = Repo.update!(changeset)
             |> Repo.preload(Thread.preload_param)
             |> Thread.format
    log_data = %{
      title: thread.title,
    }
    |> Poison.encode!()
    ThreadLog.log(thread.id, "edit", log_data)
    {:ok, %{"thread" => thread}, socket}
  end

  def handle_action("fetch", ids, socket) do
    threads = Thread
              |> where([t], t.id in ^ids)
              |> select([t], t)
              |> preload(^Thread.preload_param)
              |> Repo.all
              |> Enum.map(fn g -> {Integer.to_string(g.id), Thread.format(g)} end)
              |> Enum.into(%{})
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("fetch all threads", _params, socket) do
    query = from t in Thread,
      select: t.id,
      order_by: [desc: t.updated_at],
      limit: 100
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("get by account", _, socket) do
    account_id = socket.assigns.account.id
    query = from t in Thread,
      where: t.account_id == ^account_id,
      select: t.id,
      order_by: [desc: t.updated_at],
      limit: 100
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end

  def handle_action("get by group", id, socket) do
    query = from t in Thread,
      where: t.parent_group_id == ^id,
      select: t.id,
      order_by: [desc: t.inserted_at],
      limit: 100
    threads = Repo.all(query)
    {:ok, %{threads: threads}, socket}
  end
end
