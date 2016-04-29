defmodule Agora.ThreadView do
  use Agora.Web, :view

  def render("index.json", %{threads: threads}) do
    %{data: render_many(threads, Agora.ThreadView, "thread.json")}
  end

  def render("show.json", %{thread: thread}) do
    %{data: render_one(thread, Agora.ThreadView, "thread.json")}
  end

  def render("thread.json", %{thread: thread}) do
    %{id: thread.id,
      name: thread.name,
      account_id: thread.account_id,
      user_id: thread.user_id,
      parent_group_id: thread.parent_group_id}
  end
end
