defmodule Agora.UserSocket do
  use Phoenix.Socket

  require Logger

  channel "account:*", Agora.AccountChannel
  channel "thread:*", Agora.ThreadChannel
  channel "group:*", Agora.GroupChannel
  channel "watchlist:*", Agora.WatchlistChannel
  channel "common", Agora.CommonChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token}, socket) do
    case Onetime.pop(:channel_token, token) do
      {:ok, client} ->
        socket = socket
                  |> assign(:account, client.account)
                  |> assign(:conn, client.conn)
        {:ok, socket}
      :error -> :error
    end
  end

  def id(_socket), do: nil
end
