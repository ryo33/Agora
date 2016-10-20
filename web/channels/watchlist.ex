defmodule Agora.WatchlistChannel do
  use Agora.Web, :channel

  alias Agora.Thread
  alias Agora.Post
  alias Agora.Group
  alias Agora.Member
  alias Agora.Watchlist
  alias Agora.WatchThread
  alias Agora.WatchGroup

  @limit_num 10

  def join("watchlist:" <> id, _params, socket) do
    import Ecto.Query
    id = String.to_integer id
    if Agora.Watchlist.exists?(id) do
      items = get_watchlist_items(id)
      {:ok, %{items: items}, socket}
    else
      {:error, %{reason: "The ID does not exist"}}
    end
  end

  defp get_watchlist_items(watchlist_id) do
    get_group_items(watchlist_id) ++ get_thread_items(watchlist_id)
  end

  defp get_thread_items(watchlist_id) do
    WatchThread
    |> where([thread], thread.watchlist_id == ^watchlist_id)
    |> select([thread], thread.id)
    |> Repo.all
    |> Enum.flat_map(fn thread ->
      Post
      |> where([post], post.thread_id == ^thread)
      |> select([post], %{type: "thread_new_post", id: post.id, inserted_at: post.inserted_at})
      |> order_by([post], [desc: post.inserted_at])
      |> limit(^@limit_num)
      |> Repo.all()
    end)
  end

  defp get_group_items(watchlist_id) do
    WatchGroup
    |> where([group], group.watchlist_id == ^watchlist_id)
    |> select([group], group.id)
    |> Repo.all
    |> Enum.flat_map(fn group ->
      threads = Thread
      |> where([thread], thread.parent_group_id == ^group)
      |> select([thread], %{type: "group_new_thread", id: thread.id, inserted_at: thread.inserted_at})
      |> order_by([thread], [desc: thread.inserted_at])
      |> limit(@limit_num)
      |> Repo.all()
      groups = Group
      |> where([group], group.parent_group_id == ^group)
      |> select([group], %{type: "group_new_group", id: group.id, inserted_at: group.inserted_at})
      |> order_by([group], [desc: group.inserted_at])
      |> limit(@limit_num)
      |> Repo.all()
      members = Member
      |> where([member], member.group_id == ^group)
      |> select([member], %{type: "group_new_member", group_id: member.group_id, id: member.user_id, inserted_at: member.inserted_at})
      |> order_by([member], [desc: member.inserted_at])
      |> limit(@limit_num)
      |> Repo.all()
      threads ++ groups ++ members
    end)
  end
end
