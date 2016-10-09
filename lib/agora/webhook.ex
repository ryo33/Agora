defmodule Agora.Webhook do
  use HTTPoison.Base

  @expected_fields ~w(actions)

  # Callbacks
  def process_response_body(body) do
    case Poison.decode(body) do
      {:ok, body} ->
        body
        |> Map.take(@expected_fields)
        |> Enum.into(%{})
      _ -> %{"actions" => []}
    end
  end

  import Ecto.Query
  alias Agora.Repo
  alias Agora.Thread
  alias Agora.User
  alias Agora.ThreadWebhook
  alias Agora.ThreadWebhookLink

  def handle_post(post, socket) do
    count = ThreadWebhook
            |> where([webhook], webhook.user_id == ^post.user_id)
            |> select([webhook], count(webhook.id))
            |> Repo.one!
    if count == 0 do
      IO.puts('hook')
      thread_id = post.thread_id
      hooks = ThreadWebhookLink
              |> join(:left, [link], webhook in ThreadWebhook, link.thread_webhook_id == webhook.id)
              |> where([link, webhook], link.thread_id == ^thread_id)
              |> select([link, webhook], webhook)
              |> Repo.all
      if length(hooks) != 0 do
        user_id = post.user_id
        thread = Repo.get!(Thread, thread_id) |> Repo.preload(Thread.preload_param)
        user = Repo.get!(User, user_id)
        params = %{
          "event" => "post",
          "payload" => %{
            "user" => user,
            "thread" => thread,
            "post" => post
          }
        } |> Poison.encode!
        headers = %{'content-type' => 'application/json'}

        hooks
        |> Enum.map(fn hook ->
          url = hook.url
          task = Task.async(fn ->
            __MODULE__.post(url, params, headers)
          end)
          {hook, task}
        end)
        |> Enum.reduce(socket, fn {hook, task}, socket ->
          case Task.await(task) do
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
              %{"actions" => actions} = body
              if length(actions) <= 10 do
                Enum.reduce(actions, socket, fn action, socket ->
                  action(action, thread_id, hook, socket)
                end)
              else
                socket
              end
            _ -> socket
          end
        end)
      else
        socket
      end
    else
      socket
    end
  end

  defp action(action, thread_id, hook, socket) do
    case action do
      %{"action" => "post", "payload" => %{
        "title" => title,
        "text" => text
      }} ->
        params = %{
          "user_id" => hook.user_id,
          "thread_id" => thread_id,
          "title" => title,
          "text" => text
        }
        {:ok, socket} = Agora.ChannelController.Post.handle_action("add", %{"params" => params, "default_user" => nil}, socket)
        socket
      _ -> socket
    end
  end
end
