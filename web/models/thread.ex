defmodule Agora.Thread do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [:title, :user, :id, :parent_group_id,
    :inserted_at, :updated_at
  ]}

  schema "threads" do
    field :title, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :parent_group, Agora.Group

    has_many :posts, Agora.Post

    timestamps
  end

  @required_fields ~w(title account_id user_id)
  @optional_fields ~w(parent_group_id)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:title, min: 1)
  end

  def exists?(id) do
    query = from t in Agora.Thread,
      where: t.id == ^id,
      limit: 1,
      select: count(t.id)
    case Repo.all(query) do
      [1] -> true
      _ -> false
    end
  end
end
