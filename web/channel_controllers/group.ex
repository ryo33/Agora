defmodule Agora.ChannelController.Group do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", group_params, socket) do
    changeset = Group.changeset(%Group{}, put_info(group_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, group} ->
        Logger.debug "#{inspect group}"
        group_id = group.parent_group_id
        if group_id != nil do
          query = from g in Agora.Group,
            where: g.parent_group_id == ^group_id,
            order_by: [desc: g.inserted_at],
            select: g.id
          groups = Repo.all(query)
          broadcast_to_group(group.parent_group_id, "add groups", %{
            groups: groups
          })
        end
        {:ok, %{"id" => group.id}, socket}
      {:error, changeset} ->
        Logger.debug "#{inspect changeset}"
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch", ids, socket) do
    members_query = Agora.Member
                    |> select([m], m.id)
    threads_query = fn ids ->
      Agora.Thread
      |> select([t], %{group_id: t.parent_group_id})
      |> where([t], t.parent_group_id in ^ids)
      |> Repo.all
    end
    groups_query = fn ids ->
      Agora.Group
      |> select([g], %{group_id: g.parent_group_id})
      |> where([g], g.parent_group_id in ^ids)
      |> Repo.all
    end
    query = Agora.Group
            |> where([g], g.id in ^ids)
            |> select([g], g)
            |> preload([members: ^members_query])
            |> preload([threads: ^threads_query])
            |> preload([groups: ^groups_query])
    func = fn g ->
      g
      |> Map.update!(:members, fn ids -> length(ids) end)
      |> Map.update!(:threads, fn ids -> length(ids) end)
      |> Map.update!(:groups, fn ids -> length(ids) end)
      |> (fn g -> {Integer.to_string(g.id), g} end).()
    end
    groups = Repo.all(query)
             |> Enum.map(func)
             |> Enum.into(%{})
    {:ok, %{groups: groups}, socket}
  end

  def handle_action("fetch all groups", _params, socket) do
    query = from g in Group,
      select: g.id,
      order_by: [desc: g.updated_at],
      limit: 100
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end

  def handle_action("get by account", _, socket) do
    account_id = socket.assigns.account.id
    query = from g in Group,
      where: g.account_id == ^account_id,
      select: g.id,
      order_by: [desc: g.updated_at],
      limit: 100
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end

  def handle_action("get by group", id, socket) do
    query = from g in Group,
      where: g.parent_group_id == ^id,
      select: g.id,
      order_by: [desc: g.updated_at],
      limit: 100
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end
end
