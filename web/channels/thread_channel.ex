defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    if Agora.Thread.exists?(id) do
      id = String.to_integer id
      query = from p in Agora.Post,
        where: p.thread_id == ^id,
        select: p.id,
        order_by: [desc: p.inserted_at]
      posts = Repo.all(query)
      {:ok, %{posts: posts}, socket}
    else
      {:error, %{reason: "The ID does not exist"}}
    end
  end

  def handle_in("members", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Member, socket, action, params)
  end

  def handle_in("threads", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("posts", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
