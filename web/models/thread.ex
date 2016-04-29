defmodule Agora.Thread do
  use Agora.Web, :model

  schema "threads" do
    field :name, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :parent_group, Agora.ParentGroup

    has_many :posts, Agora.Post

    timestamps
  end

  @required_fields ~w(name account_id user_id)
  @optional_fields ~w(parent_group_id)

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
end
