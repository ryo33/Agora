defmodule Agora.CommonChannel do
  use Agora.Web, :channel

  def join("common", _payload, socket) do
    {:ok, %{actions: []}, socket}
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("user", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.User, socket, action, params)
  end

  def handle_in("thread", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("post", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end

  def handle_in("group", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Group, socket, action, params)
  end
end
