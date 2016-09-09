defmodule Agora.ChannelController.Member do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("add", member_params, socket) do
    account_id = socket.assigns.account.id
    member_params = Map.put(member_params, "account_id", account_id)
    IO.inspect(member_params)
    changeset = Member.changeset(%Member{}, member_params)
    user_id = Ecto.Changeset.get_change(changeset, :user_id)
    group_id = Ecto.Changeset.get_change(changeset, :group_id)
    true = User.exists?(user_id)
    true = Group.exists?(group_id)
    if Member.has_join?(group_id, user_id) do
      {:error, socket}
    else
      case Repo.insert(changeset) do
        {:ok, member} ->
          query = from m in Agora.Member,
            where: m.group_id == ^member.group_id,
            order_by: [desc: m.inserted_at],
            select: m.id
          members = Repo.all(query)
          broadcast_to_group(member.group_id, "add members", %{
            members: members
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
      order_by: [desc: m.inserted_at]
    members = Repo.all(query)
    group = Repo.one from g in Agora.Group,
      where: g.id == ^id,
      select: g
    {:ok, %{group: group, members: members}, socket}
  end

  def handle_action("get by group", id, socket) do
    query = from m in Member,
      where: m.group_id == ^id,
      select: m.user_id,
      order_by: [desc: m.updated_at],
      limit: 100
    members = Repo.all(query)
    {:ok, %{members: members}, socket}
  end
end
