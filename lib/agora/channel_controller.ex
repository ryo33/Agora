defmodule Agora.ChannelController do
  defmacro __using__(_opts) do
    quote do
      alias Agora.Repo
      import Ecto.Query, only: [from: 1, from: 2]

      alias Agora.Account
      alias Agora.User
      alias Agora.Thread
      alias Agora.Post
      alias Agora.Group
      alias Agora.Member

      defp push(socket, action) when not is_list(action), do: push(socket, [action])
      defp push(socket, actions) do
        Phoenix.Channel.push(socket, "dispatch", %{actions: actions})
      end

      defp broadcast(socket, action) when not is_list(action), do: broadcast(socket, [action])
      defp broadcast(socket, actions) do
        Phoenix.Channel.broadcast!(socket, "dispatch", %{actions: actions})
      end

      defp broadcast_to_account(socket, action) when not is_list(action), do: broadcast_to_account(socket, [action])
      defp broadcast_to_account(id, actions) do
        Agora.Endpoint.broadcast!("account:" <> id, "dispatch", %{actions: actions})
      end

      defp broadcast_to_thread(socket, action) when not is_list(action), do: broadcast_to_thread(socket, [action])
      defp broadcast_to_thread(id, actions) do
        Agora.Endpoint.broadcast!("thread:" <> id, "dispatch", %{actions: actions})
      end

      defp broadcast_to_group(socket, action) when not is_list(action), do: broadcast_to_group(socket, [action])
      defp broadcast_to_group(id, actions) do
        Agora.Endpoint.broadcast!("group:" <> id, "dispatch", %{actions: actions})
      end

      defp get(changeset, key) do
        Ecto.Changeset.get_field(changeset, key)
      end
    end
  end

  def action(module, socket, action, params) do
    result = apply(module, :handle_action, [action, params, socket])
    case result do
      {:ok, socket} -> {:reply, :ok, socket}
      {:error, socket} -> {:replay, :ok, socket}
      {:ok, resp, socket} -> {:reply, {:ok, resp}, socket}
      {:error, resp, socket} -> {:reply, {:error, resp}, socket}
      socket -> {:noreply, socket}
    end
  end
end
