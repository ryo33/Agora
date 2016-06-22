defmodule Agora.ChannelController.Group do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", group_params, socket) do
    changeset = Group.changeset(put_info(%Group{}, socket), group_params)
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

  def handle_action("get_info", %{"id" => id}, socket) do
    group = Repo.one from g in Agora.Group,
      where: g.id == ^id,
      select: g,
      preload: [:user, :parent_group]
    {:ok, %{group: group}, socket}
  end

  def handle_action("get", _params, socket) do
    query = from g in Group,
      select: g,
      order_by: [desc: g.updated_at],
      limit: 100,
      preload: [:user, :parent_group]
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end

  def handle_action("get_by_account", _, socket) do
    account_id = socket.assigns.account.id
    query = from g in Group,
      where: g.account_id == ^account_id,
      select: g,
      order_by: [desc: g.updated_at],
      limit: 100,
      preload: [:user, :parent_group]
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end
end
