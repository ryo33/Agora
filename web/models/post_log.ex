defmodule Agora.PostLog do
  use Agora.Web, :model

  schema "post_logs" do
    field :action, :string
    field :body, :string
    belongs_to :post, Agora.Post

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:action, :body])
    |> validate_required([:action, :body])
  end

  def log(post_id, action, body) do
    struct = %__MODULE__{
      post_id: post_id,
      action: action,
      body: body
    }
    Agora.Repo.insert(struct)
  end
end
