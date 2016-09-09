defmodule Agora.ChannelController.Group do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", group_params, socket) do
    changeset = Group.changeset(%Group{}, put_info(group_params, socket))
    true = validate_info(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, group} ->
        Logger.debug "#{inspect group}"
        if group.parent_group_id != nil do
          broadcast_to_group(group.parent_group_id, "add_group", %{group: group})
        end
        {:ok, %{"id" => group.id}, socket}
      {:error, changeset} ->
        Logger.debug "#{inspect changeset}"
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("fetch", ids, socket) do
    query = Agora.Group
            |> where([g], g.id in ^ids)
            |> select([g], {g.id, g})
    groups = Repo.all(query) |> Enum.map(fn {k, v} -> {Integer.to_string(k), v} end) |> Enum.into(%{})
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
