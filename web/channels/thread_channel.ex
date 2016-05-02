defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    if Agora.Thread.exists?(id) do
      query = from p in Agora.Post,
        where: p.thread_id == ^id,
        select: p,
        preload: [:user]
      posts = Repo.all(query)
      id = String.to_integer id
      thread = Repo.one from t in Agora.Thread,
        where: t.id == ^id,
        select: t,
        preload: [:user, :parent_group]
      action = %{
        type: "SET_THREAD_CONTENTS",
        posts: posts,
        info: thread
      }
      {:ok, %{actions: [action]}, socket}
    else
      {:error, %{reason: "ID does not exist"}}
    end
  end

  def handle_in("thread", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end

  def handle_in("post", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
