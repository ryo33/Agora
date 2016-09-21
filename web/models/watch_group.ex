defmodule Agora.WatchGroup do
  use Agora.Web, :model

  schema "watchgroups" do
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :watchlist, Agora.Watchlist
    belongs_to :group, Agora.Group

    timestamps()
  end

  @required_fields ~w(watchlist_id account_id user_id group_id)a
  @optional_fields ~w()a
  @fields @required_fields ++ @optional_fields

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@required_fields)
  end
end
