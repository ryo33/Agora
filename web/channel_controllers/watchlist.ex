defmodule Agora.ChannelController.Watchlist do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", watchlist_params, socket) do
    changeset = Watchlist.changeset(%Watchlist{}, put_info(watchlist_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, watchlist} ->
        account_id = socket.assigns.account.id
        query = from w in Watchlist,
          where: w.account_id == ^account_id,
          order_by: [desc: w.inserted_at],
          select: w.id
        watchlists = Repo.all(query)
        broadcast_to_account(account_id, "add watchlists", %{
          watchlists: watchlists
        })
        {:ok, %{"id" => watchlist.id}, socket}
      {:error, changeset} -> {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch", ids, socket) do
    groups_query = WatchGroup
                   |> select([group], group.group_id)
    threads_query = WatchThread
                    |> select([thread], thread.thread_id)
    query = Watchlist
            |> where([watchlist], watchlist.id in ^ids)
            |> select([watchlist], watchlist)
            |> preload([watch_groups: ^groups_query])
            |> preload([watch_threads: ^threads_query])
    watchlists = Repo.all(query)
    |> Enum.map(fn watchlist ->
      {Integer.to_string(watchlist.id), watchlist}
    end)
    |> Enum.into(%{})
    {:ok, %{watchlists: watchlists}, socket}
  end

  def handle_action("watch group", params, socket) do
    watchlist_id = Map.fetch!(params, "watchlist_id")
    query = from watchlist in Watchlist,
      where: watchlist.id == ^watchlist_id,
      select: watchlist.user_id
    user_id = Repo.one!(query)
    params = Map.put(params, "user_id", user_id)

    changeset = WatchGroup.changeset(%WatchGroup{}, put_info(params, socket))
    true = validate_info(changeset, socket)
    case Repo.insert(changeset) do
      {:ok, watch_group} -> {:ok, %{"id" => watch_group.group_id}, socket}
      {:error, changeset} ->
        Logger.debug("#{inspect changeset.errors}")
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("watch thread", params, socket) do
    watchlist_id = Map.fetch!(params, "watchlist_id")
    query = from watchlist in Watchlist,
      where: watchlist.id == ^watchlist_id,
      select: watchlist.user_id
    user_id = Repo.one!(query)
    params = Map.put(params, "user_id", user_id)

    changeset = WatchThread.changeset(%WatchThread{}, put_info(params, socket))
    true = validate_info(changeset, socket)
    case Repo.insert(changeset) do
      {:ok, watch_thread} -> {:ok, %{"id" => watch_thread.thread_id}, socket}
      {:error, changeset} ->
        Logger.debug("#{inspect changeset.errors}")
        {:error, socket} # TODO return error message
    end
  end
end
