defmodule Agora.ChannelController.Group do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", group_params, socket) do
    changeset = Group.changeset(%Group{}, put_info(group_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, group} ->
        # Add owner as a member
        member_params = %{"user_id" => group.user_id, "group_id" => group.id}
        changeset = Member.changeset(%Member{}, put_info(member_params, socket))
        Repo.insert!(changeset)
        # Broadcast to channel
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

  def handle_action("edit", %{"id" => id, "params" => params}, socket) do
    # TODO Check if the user is the owner"

    group = Repo.get!(Group, id)
    changeset = Group.changeset(group, params)
    true = validate_info(changeset, socket)

    group = Repo.update!(changeset)
            |> Repo.preload(Group.preload_param)
            |> Group.format
    {:ok, %{"group" => group}, socket}
  end

  def handle_action("fetch", ids, socket) do
    groups = Group
             |> where([g], g.id in ^ids)
             |> select([g], g)
             |> preload(^Group.preload_param)
             |> Repo.all
             |> Enum.map(fn g -> {Integer.to_string(g.id), Group.format(g)} end)
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
