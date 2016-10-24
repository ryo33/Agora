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

  def handle_action("edit", %{"id" => id, "params" => params}, socket) do
    # TODO Check if the user is the owner"

    watchlist = Repo.get!(Watchlist, id)
    changeset = Watchlist.changeset(watchlist, params)
    true = validate_info(changeset, socket)

    watchlist = Repo.update!(changeset)
                |> Repo.preload(Watchlist.preload_param)
                |> Watchlist.format
    {:ok, %{"watchlist" => watchlist}, socket}
  end

  def handle_action("fetch", ids, socket) do
    watchlists = Watchlist
            |> where([watchlist], watchlist.id in ^ids)
            |> select([watchlist], watchlist)
            |> preload(^Watchlist.preload_param)
            |> Repo.all()
            |> Enum.map(fn w -> {Integer.to_string(w.id), Watchlist.format(w)} end)
            |> Enum.into(%{})
    {:ok, %{watchlists: watchlists}, socket}
  end

  def handle_action("watch group", params, socket) do
    # TODO Check if the user is the owner"

    watchlist_id = Map.fetch!(params, "watchlist_id")
    group_id = Map.fetch!(params, "group_id")

    query = from item in WatchGroup,
      where: item.watchlist_id == ^watchlist_id and item.group_id == ^group_id,
      select: count(item.id)
    0 = Repo.one!(query)

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
    # TODO Check if the user is the owner"

    watchlist_id = Map.fetch!(params, "watchlist_id")
    thread_id = Map.fetch!(params, "thread_id")

    query = from item in WatchThread,
      where: item.watchlist_id == ^watchlist_id and item.thread_id == ^thread_id,
      select: count(item.id)
    0 = Repo.one!(query)

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

  def handle_action("unwatch group", params, socket) do
    # TODO Check if the user is the owner"

    watchlist_id = Map.fetch!(params, "watchlist_id")
    group_id = Map.fetch!(params, "group_id")
    query = from group in WatchGroup,
      where: group.group_id == ^group_id,
      where: group.watchlist_id == ^watchlist_id
    Repo.one!(query)
    |> Repo.delete!()
    {:ok, socket}
  end

  def handle_action("unwatch thread", params, socket) do
    # TODO Check if the user is the owner"

    watchlist_id = Map.fetch!(params, "watchlist_id")
    thread_id = Map.fetch!(params, "thread_id")
    query = from thread in WatchThread,
      where: thread.thread_id == ^thread_id,
      where: thread.watchlist_id == ^watchlist_id
    Repo.one!(query)
    |> Repo.delete!()
    {:ok, socket}
  end
end
