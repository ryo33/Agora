defmodule Agora.Member do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :user_id, :id, :group_id,
    :inserted_at, :updated_at
  ]}

  schema "members" do
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :group, Agora.Group

    timestamps
  end

  @required_fields ~w(account_id user_id group_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
  end

  def has_join?(group_id, user_id) do
    result = Repo.one from m in Agora.Member,
      where: m.group_id == ^group_id and m.user_id == ^user_id,
      select: m.id
    case result do
      nil -> false
      _ -> true
    end
  end
end
