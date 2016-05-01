defmodule Agora.ChannelController.Group do
  use Agora.Web, :channel_controller

  require Logger

  def handle_action("get", _params, socket) do
    query = from t in Group,
      select: t,
      limit: 100
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end

  def handle_action("get_by_account", _, socket) do
    account_id = socket.assigns.account.id
    query = from t in Group,
      where: t.account_id == ^account_id,
      select: t,
      limit: 100
    groups = Repo.all(query)
    {:ok, %{groups: groups}, socket}
  end
end
