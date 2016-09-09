defmodule Agora.User do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :uid, :name, :id,
    :inserted_at, :updated_at
  ]}

  schema "users" do
    field :uid, :string
    field :name, :string
    belongs_to :account, Agora.Account

    has_many :threads, Agora.Thread
    has_many :posts, Agora.Post
    has_many :groups, Agora.Group
    has_many :members, Agora.Member

    timestamps
  end

  @required_fields ~w(uid name account_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:uid, min: 3)
    |> validate_length(:name, min: 1)
    |> unique_constraint(:uid)
  end

  def exists?(id) do
    query = from u in Agora.User,
      where: u.id == ^id,
      select: count(u.id)
    case Repo.one(query) do
      1 -> true
      _ -> false
    end
  end

  def order_by(query) do
    query |> order_by([t], [desc: t.inserted_at])
  end
end
