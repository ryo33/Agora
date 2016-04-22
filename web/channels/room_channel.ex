defmodule Agora.RoomChannel do
  use Phoenix.Channel

  def join("web", _params, socket) do
    resp = "joined"
    {:ok, resp, socket}
  end
end
