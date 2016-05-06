defmodule Agora.Group do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :name, :user, :id, :parent_group,
    :inserted_at, :updated_at
  ]}

  schema "groups" do
    field :name, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :parent_group, Agora.Group

    has_many :threads, Agora.Thread
    has_many :members, Agora.Member

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:name, min: 1)
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
