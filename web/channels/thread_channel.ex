defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    if Agora.Thread.exists?(id) do
      query = from p in Agora.Post,
      where: p.thread_id == ^id,
      select: p
      posts = Repo.all(query)
      action = %{
        type: "SET_THREAD_CONTENTS",
        posts: posts
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
