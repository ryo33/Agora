defmodule Agora.ChannelController do
  require Logger

  def put_info(map, socket) do
    map
    |> Map.put("account_id", socket.assigns.account.id)
    |> Map.put_new("user_id", Map.get(socket.assigns, :current_user))
  end

  def validate_info(changeset, socket) do
    account_id = socket.assigns.account.id
    Ecto.Changeset.get_field(changeset, :account_id) == account_id
    and Agora.Account.has_user?(account_id, Ecto.Changeset.get_change(changeset, :user_id))
  end

  def push(socket, event, message) do
    Phoenix.Channel.push(socket, event, message)
  end

  def broadcast(socket, event, message)  do
    Phoenix.Channel.broadcast!(socket, event, message)
  end

  def broadcast_to_account(id, event, message)  do
    Agora.Endpoint.broadcast!("account:" <> to_string(id), event, message)
  end

  def broadcast_to_thread(id, event, message)  do
    Agora.Endpoint.broadcast!("thread:" <> to_string(id), event, message)
  end

  def broadcast_to_group(id, event, message)  do
    Agora.Endpoint.broadcast!("group:" <> to_string(id), event, message)
  end

  def action(module, socket, action, params) do
    result = apply(module, :handle_action, [action, params, socket])
    case result do
      {:ok, socket} -> {:reply, :ok, socket}
      {:error, socket} -> {:reply, :error, socket}
      {:ok, resp, socket} -> {:reply, {:ok, resp}, socket}
      {:error, resp, socket} -> {:reply, {:error, resp}, socket}
      socket -> {:noreply, socket}
    end
  end

  defmacro __using__(_opts) do
    quote do
      import Agora.ChannelController, except: [action: 4]
    end
  end
end
