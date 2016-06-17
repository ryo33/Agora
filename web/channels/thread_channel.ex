defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("thread:" <> id, _params, socket) do
    if Agora.Thread.exists?(id) do
      {:ok, socket}
    else
      {:error, %{reason: "ID does not exist"}}
    end
  end

  def handle_in("member", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Member, socket, action, params)
  end

  def handle_in("thread", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("post", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
