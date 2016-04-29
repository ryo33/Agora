defmodule Agora.PostView do
  use Agora.Web, :view

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, Agora.PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, Agora.PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      name: post.name,
      text: post.text,
      account_id: post.account_id,
      user_id: post.user_id,
      thread_id: post.thread_id,
      post_id: post.post_id}
  end
end
