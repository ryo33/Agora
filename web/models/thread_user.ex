defmodule Agora.ThreadUser do
  use Agora.Web, :model

  schema "thread_users" do
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :thread, Agora.Thread

    timestamps()
  end

  @required_fields ~w(account_id user_id thread_id)
  @optional_fields ~w()
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
