defmodule Agora.Watchlist do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :id, :name, :user_id,
    :watch_threads, :watch_groups,
    :inserted_at, :updated_at
  ]}

  schema "watchlists" do
    field :name, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User

    has_many :watch_groups, Agora.WatchGroup
    has_many :watch_threads, Agora.WatchThread

    timestamps()
  end

  @required_fields ~w(name account_id user_id)a
  @optional_fields ~w()a
  @fields @required_fields ++ @optional_fields

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@required_fields)
    |> validate_length(:name, min: 1)
  end

  def exists?(id) do
    query = from t in Agora.Thread,
      where: t.id == ^id,
      limit: 1,
      select: count(t.id)
    case Repo.one(query) do
      1 -> true
      _ -> false
    end
  end
end
