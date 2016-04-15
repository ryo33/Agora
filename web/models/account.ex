defmodule Agora.Account do
  use Agora.Web, :model

  schema "account" do
    field :provider, :string
    field :provided_id, :string
    field :name, :string

    has_many :users, HelloPhoenix.User
    timestamps
  end

  @required_fields ~w(provider provided_id name)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:provider, min: 1)
    |> validate_length(:provided_id, min: 1)
    |> validate_length(:name, min: 1)
  end
end
