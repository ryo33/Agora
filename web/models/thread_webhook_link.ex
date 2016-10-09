defmodule Agora.ThreadWebhookLink do
  use Agora.Web, :model

  schema "thread_webhook_links" do
    belongs_to :thread_webhook, Agora.ThreadWebhook
    belongs_to :thread, Agora.Thread
    belongs_to :user, Agora.User

    timestamps()
  end

  @fields ~w(thread_webhook_id thread_id user_id)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@fields)
  end
end
