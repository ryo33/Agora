defmodule Agora.User do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [:uid, :name, :id]}

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
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:uid, min: 3)
    |> validate_length(:name, min: 1)
    |> unique_constraint(:uid)
  end
end
