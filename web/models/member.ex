defmodule Agora.Member do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :user, :id, :group_id,
    :inserted_at, :updated_at
  ]}

  schema "members" do
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :group, Agora.Group

    timestamps
  end

  @required_fields ~w(:user_id, :group_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
