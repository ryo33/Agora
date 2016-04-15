defmodule Agora.UserView do
  use Agora.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Agora.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Agora.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      account_id: user.account_id}
  end
end
