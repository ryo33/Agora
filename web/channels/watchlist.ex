defmodule Agora.WatchlistChannel do
  use Agora.Web, :channel

  alias Agora.Thread
  alias Agora.Post
  alias Agora.Group
  alias Agora.Member
  alias Agora.Watchlist
  alias Agora.WatchThread
  alias Agora.WatchGroup

  def join("watchlist:" <> id, _params, socket) do
    import Ecto.Query
    id = String.to_integer id
    if Agora.Watchlist.exists?(id) do
      threads = WatchThread
                |> where([thread], thread.watchlist_id == ^id)
                |> select([thread], thread.id)
                |> Repo.all
                groups = WatchGroup
                         |> where([group], group.watchlist_id == ^id)
                         |> select([group], group.id)
                         |> Repo.all 
                         limit_num = 2
      threads = Enum.map(threads, fn thread ->
        query = Post
                |> where([post], post.thread_id == ^thread)
                |> select([post], %{id: post.id, inserted_at: post.inserted_at})
                |> order_by([post], [desc: post.inserted_at])
                |> limit(^limit_num)
        %{id: thread, posts: Repo.all(query)}
      end)
      groups = Enum.map(groups, fn group ->
        query = Thread
                |> where([thread], thread.parent_group_id == ^group)
                |> select([thread], %{id: thread.id, inserted_at: thread.inserted_at})
                |> order_by([thread], [desc: thread.inserted_at])
                |> limit(^limit_num)
        threads = Repo.all(query)
        query = Group
                |> where([group], group.parent_group_id == ^group)
                |> select([group], %{id: group.id, inserted_at: group.inserted_at})
                |> order_by([group], [desc: group.inserted_at])
                |> limit(^limit_num)
        groups = Repo.all(query)
        query = Member
                |> where([member], member.group_id == ^group)
                |> select([member], %{id: member.user_id, inserted_at: member.inserted_at})
                |> order_by([member], [desc: member.inserted_at])
                |> limit(^limit_num)
        members = Repo.all(query)
        %{id: group, threads: threads, groups: groups, members: members}
      end)
      {:ok, %{threads: threads, groups: groups}, socket}
    else
      {:error, %{reason: "The ID does not exist"}}
    end
  end
end
