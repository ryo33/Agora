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
  alias Agora.Post
  alias Agora.User
  alias Agora.ThreadWebhook
  alias Agora.ThreadWebhookLink

  def handle_post(post) do
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
      reply_to = if is_nil(post.post_id) do
        nil
      else
        Repo.get!(Post, post.post_id)
      end
      params = %{
        "event" => "post",
        "payload" => %{
          "user" => user,
          "thread" => thread,
          "post" => post,
          "reply_to" => reply_to
        }
      } |> Poison.encode!
      headers = %{'content-type' => 'application/json'}

      hooks
      |> Enum.map(fn hook ->
        url = hook.url
        task = Task.start(fn ->
          result = __MODULE__.post(url, params, headers)
          case result do
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
              %{"actions" => actions} = body
              if length(actions) <= 10 do
                Enum.map(actions, fn action ->
                  Task.start(fn -> action(action, thread_id, hook) end)
                end)
              end
              _ -> nil
          end
        end)
      end)
    end
  end

  defp action(action, thread_id, hook) do
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
        params = %{"params" => params, "default_user" => nil}
        Agora.ChannelController.Post.handle_action "add", params, nil
      _ -> nil
    end
  end
end
