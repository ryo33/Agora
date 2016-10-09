defmodule Agora.ChannelController.ThreadWebhook do
  use Agora.Web, :channel_controller

  require Logger
  alias Agora.ThreadWebhook
  alias Agora.ThreadWebhookLink

  def handle_action("add", params, socket) do
    changeset = ThreadWebhook.changeset(%ThreadWebhook{}, params)
    true = validate_user(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, webhook} ->
        {:ok, %{"id" => webhook.id}, socket}
      {:error, changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("link", params, socket) do
    {user_id, params} = Map.pop(params, "webhook_user_id")
    thread_webhook_id = ThreadWebhook
                        |> where([webhook], webhook.user_id == ^user_id)
                        |> select([webhook], webhook.id)
                        |> Repo.one!
    params = Map.put(params, "thread_webhook_id", thread_webhook_id)

    changeset = ThreadWebhookLink.changeset(%ThreadWebhookLink{}, params)
    true = validate_user(changeset, socket)

    case Repo.insert(changeset) do
      {:ok, link} ->
        handle_action("get by thread", %{"thread_id" => link.thread_id}, socket)
      {:error, changeset} ->
        {:error, socket} # TODO return error message
    end
  end

  def handle_action("edit", %{"id" => id, "params" => params}, socket) do
    webhook = Repo.get!(ThreadWebhook, id)
    changeset = ThreadWebhook.changeset(webhook, params)
    true = validate_user(changeset, socket)

    webhook = Repo.update!(changeset)
    {:ok, %{"webhook" => webhook}, socket}
  end

  def handle_action("delete", id, socket) do
    webhook = Repo.get!(ThreadWebhook, id)
    Repo.delete(webhook)
    handle_action("get by account", nil, socket)
  end

  def handle_action("unlink", %{"thread_id" => thread_id, "user_id" => user_id}, socket) do
    link = ThreadWebhookLink
           |> join(:left, [link], webhook in ThreadWebhook, link.thread_webhook_id == webhook.id)
           |> where([link, webhook], link.thread_id == ^thread_id)
           |> where([link, webhook], webhook.user_id == ^user_id)
           |> select([link, webhook], link)
           |> Repo.one!
    Repo.delete(link)
    handle_action("get by thread", %{"thread_id" => thread_id}, socket)
  end

  def handle_action("fetch", ids, socket) do
    webhooks = ThreadWebhook
               |> where([t], t.id in ^ids)
               |> select([t], t)
               |> Repo.all
               |> Enum.map(fn t -> {Integer.to_string(t.id), t} end)
               |> Enum.into(%{})
    {:ok, %{webhooks: webhooks}, socket}
  end

  def handle_action("get by thread", %{"thread_id" => thread_id}, socket) do
    links = ThreadWebhookLink
            |> where([link], link.thread_id == ^thread_id)
            |> select([link], link.thread_webhook_id)
            |> Repo.all
    {:ok, %{links: links}, socket}
  end

  def handle_action("get by account", _, socket) do
    account_id = socket.assigns.account.id
    users = User
            |> where([user], user.account_id == ^account_id)
            |> select([user], user.id)
            |> Repo.all
    query = from t in ThreadWebhook,
      where: t.user_id in ^users,
      select: t.id
    webhooks = Repo.all(query)
    {:ok, %{webhooks: webhooks}, socket}
  end
end
