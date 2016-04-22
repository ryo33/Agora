defmodule Agora.UserSocket do
  use Phoenix.Socket

  channel "web", Agora.RoomChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case Onetime.pop(:channel_token, token) do
      {:ok, client} ->
        {:ok, assign(socket, :client, client)}
      :error -> :error
    end
  end

  def id(_socket), do: nil
end
