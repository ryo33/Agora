defmodule Agora.CommonChannel do
  use Agora.Web, :channel

  def join("common", _payload, socket) do
    {:ok, %{actions: []}, socket}
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("users", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.User, socket, action, params)
  end

  def handle_in("threads", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Thread, socket, action, params)
  end

  def handle_in("posts", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end

  def handle_in("groups", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Group, socket, action, params)
  end

  def handle_in("members", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Member, socket, action, params)
  end

  def handle_in("watchlists", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Watchlist, socket, action, params)
  end

  def handle_in("webhooks", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.ThreadWebhook, socket, action, params)
  end

  def handle_in("search", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Search, socket, action, params)
  end
end
