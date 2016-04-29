defmodule Agora.Post do
  use Agora.Web, :model

  schema "posts" do
    field :name, :string
    field :text, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :thread, Agora.Thread
    belongs_to :post, Agora.Post

    has_many :posts, Agora.Post

    timestamps
  end

  @required_fields ~w(name text)
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
