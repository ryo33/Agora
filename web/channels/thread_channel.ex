defmodule Agora.ThreadChannel do
  use Agora.Web, :channel

  def join("account:" <> id, _params, socket) do
    if String.to_integer(id) == socket.assigns.account.id do
      users = Agora.Repo.all(
        from p in Agora.User,
        where: p.account_id == ^socket.assigns.account.id,
        select: p
      )
      set_users = %{
        type: "SET_USERS",
        users: users
      }
      {:ok, %{actions: [set_users]}, socket}
    else
      {:error, %{reason: "Unmatched ID"}}
    end
  end

  def handle_in("thread", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end

  def handle_in("post", %{"action" => action, "params" => params}, socket) do
    ChannelController.action(ChannelController.Post, socket, action, params)
  end
end
