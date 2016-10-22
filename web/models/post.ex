defmodule Agora.Post do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :inserted_at, :updated_at,
    :title, :text,
    :user_id, :thread_id, :post_id, :id
  ]}

  schema "posts" do
    field :title, :string
    field :text, :string
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :thread, Agora.Thread
    belongs_to :post, Agora.Post

    has_many :posts, Agora.Post

    timestamps
  end

  @required_fields ~w(text thread_id user_id)
  @optional_fields ~w(title post_id account_id)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:text, min: 1)
  end

  def get_title_text(id) do
    import Agora.Title
    post = Agora.Post
    |> where([t], t.id == ^id)
    |> select([t], [:title, :text])
    |> Repo.one!()

    "#{post.title || ""} #{post.text}"
    |> ellipsize
    |> format_title
  end
end
