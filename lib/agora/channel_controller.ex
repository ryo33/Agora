defmodule Agora.ChannelController do
  require Logger

  def put_info(map, socket) do
    map
    |> Map.put(:account_id, socket.assigns.account.id)
    |> Map.put(:user_id, Map.get(socket.assigns, :current_user))
  end

  def validate_info(changeset, socket) do
    account_id = socket.assigns.account.id
    Ecto.Changeset.get_field(changeset, :account_id) == account_id
    and Agora.Account.has_user?(account_id, Ecto.Changeset.get_field(changeset, :user_id))
  end

  def push(socket, action) when not is_list(action), do: push(socket, [action])
  def push(socket, actions) when is_list(actions) do
    Phoenix.Channel.push(socket, "dispatch", %{actions: actions})
  end

  def broadcast(socket, action) when not is_list(action), do: broadcast(socket, [action])
  def broadcast(socket, actions) when is_list(actions)  do
    Phoenix.Channel.broadcast!(socket, "dispatch", %{actions: actions})
  end

  def broadcast_to_account(id, action) when not is_list(action), do: broadcast_to_account(id, [action])
  def broadcast_to_account(id, actions) when is_list(actions)  do
    Agora.Endpoint.broadcast!("account:" <> to_string(id), "dispatch", %{actions: actions})
  end

  def broadcast_to_thread(id, action) when not is_list(action), do: broadcast_to_thread(id, [action])
  def broadcast_to_thread(id, actions) when is_list(actions)  do
    Agora.Endpoint.broadcast!("thread:" <> to_string(id), "dispatch", %{actions: actions})
  end

  def broadcast_to_group(id, action) when not is_list(action), do: broadcast_to_group(id, [action])
  def broadcast_to_group(id, actions) when is_list(actions)  do
    Agora.Endpoint.broadcast!("group:" <> to_string(id), "dispatch", %{actions: actions})
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
      alias Agora.Repo
      import Ecto.Query, only: [from: 1, from: 2]
      import Agora.ChannelController, except: [action: 4]

      alias Agora.Account
      alias Agora.User
      alias Agora.Thread
      alias Agora.Post
      alias Agora.Group
      alias Agora.Member
    end
  end
end
