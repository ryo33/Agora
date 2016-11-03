defmodule Agora.GroupLog do
  use Agora.Web, :model

  schema "group_logs" do
    field :action, :string
    field :body, :string
    belongs_to :group, Agora.Group

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

  def log(group_id, action, body) do
    struct = %__MODULE__{
      group_id: group_id,
      action: action,
      body: body
    }
    Agora.Repo.insert(struct)
  end
end
