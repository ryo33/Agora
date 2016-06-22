defmodule Agora.ChannelController.Member do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", member_params, socket) do
    account_id = socket.assigns.account.id
    changeset = Member.changeset(%Member{account_id: account_id}, member_params)
    user_id = Ecto.Changeset.get_field(changeset, :user_id)
    group_id = Ecto.Changeset.get_field(changeset, :group_id)
    true = User.exists?(user_id)
    true = Group.exists?(group_id)
    if Member.has_join?(group_id, user_id) do
      {:error, socket}
    else
      case Repo.insert(changeset) do
        {:ok, member} ->
          member = Repo.preload(member, :user)
          query = from m in Agora.Member,
            where: m.group_id == ^member.group_id,
            order_by: [desc: m.inserted_at],
            select: m.id
          members = Repo.all(query)
          member_id = to_string(member.id)
          broadcast_to_group(member.group_id, "add_members", %{
            id: member.group_id,
            members_map: %{ member_id => member },
            members_list: members
          })
          {:ok, socket}
        {:error, _changeset} ->
          {:error, socket} # TODO return error message
      end
    end
  end

  def handle_action("fetch", %{"id" => id}, socket) do
    id = String.to_integer id
    query = from m in Agora.Member,
      where: m.group_id == ^id,
      select: m,
      order_by: [desc: m.inserted_at],
      preload: [:user]
    members = Repo.all(query)
    group = Repo.one from g in Agora.Group,
      where: g.id == ^id,
      select: g,
      preload: [:user, :parent_group]
    {:ok, %{group: group, members: members}, socket}
  end

  def handle_action("fetch_members", %{ids: ids}, socket) do
    query = from m in Agora.Member,
      where: m.id in ^ids,
      select: m,
      order_by: [desc: m.inserted_at],
      preload: [:user]
    members = Repo.all(query)
    {:ok, %{members: members}, socket}
  end
end
