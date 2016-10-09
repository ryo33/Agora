defmodule Agora.ThreadWebhook do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :id, :user_id, :url,
    :inserted_at, :updated_at
  ]}

  schema "thread_webhooks" do
    field :url, :string
    field :on_post, :boolean, default: false
    field :on_join, :boolean, default: false
    field :on_leave, :boolean, default: false
    belongs_to :user, Agora.User

    timestamps()
  end

  @fields ~w(url user_id)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@fields)
  end
end
