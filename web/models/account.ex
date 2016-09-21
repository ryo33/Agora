defmodule Agora.Account do
  use Agora.Web, :model

  schema "accounts" do
    field :provider, :string
    field :provided_id, :string
    field :name, :string

    has_many :users, Agora.User
    has_many :threads, Agora.Thread
    has_many :posts, Agora.Post
    has_many :groups, Agora.Group
    has_many :members, Agora.Member

    timestamps
  end

  @required_fields ~w(provider provided_id name)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:provider, min: 1)
    |> validate_length(:provided_id, min: 1)
    |> validate_length(:name, min: 1)
  end

  def has_user?(id, user_id) do
    query = from p in Agora.User,
      where: p.account_id == ^id and p.id == ^user_id,
      limit: 1,
      select: count(p.id)
    case Repo.all(query) do
      [1] -> true
      _ -> false
    end
  end
end
