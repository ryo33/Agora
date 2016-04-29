defmodule Agora.GroupView do
  use Agora.Web, :view

  def render("index.json", %{groups: groups}) do
    %{data: render_many(groups, Agora.GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, Agora.GroupView, "group.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id,
      name: group.name,
      account_id: group.account_id,
      user_id: group.user_id,
      parent_group_id: group.parent_group_id}
  end
end
