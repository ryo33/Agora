defmodule Agora.RoomChannel do
  use Phoenix.Channel

  require Logger

  def join(topic, _params, socket) do
    resp = topic
    Logger.debug(topic)
    {:ok, resp, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end
end
