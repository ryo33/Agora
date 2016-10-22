defmodule Agora.Thread do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :id, :title, :user_id, :parent_group_id,
    :post_limited,
    :posts,
    :inserted_at, :updated_at
  ]}

  schema "threads" do
    field :title, :string
    field :post_limited, :boolean
    field :read_limited, :boolean
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :parent_group, Agora.Group

    has_many :posts, Agora.Post

    timestamps
  end

  @required_fields ~w(title account_id user_id)
  @optional_fields ~w(parent_group_id post_limited read_limited)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:title, min: 1)
  end

  def get_title_text(id) do
    import Agora.Title
    thread = Agora.Thread
    |> where([t], t.id == ^id)
    |> preload(^preload_param)
    |> Repo.one!()
    |> format

    title = ellipsize(thread.title)
    "#{title} (#{thread.posts})"
    |> format_title
  end

  def preload_param do
    posts_query = Agora.Post |> select([p], p.id)
    [posts: posts_query]
  end

  def format(thread) do
    thread
    |> Map.update!(:posts, fn ids -> length(ids) end)
  end

  def exists?(id) do
    query = from t in Agora.Thread,
      where: t.id == ^id,
      limit: 1,
      select: count(t.id)
    case Repo.one(query) do
      1 -> true
      _ -> false
    end
  end

  def order_by(query) do
    query |> order_by([t], [desc: t.inserted_at])
  end
end
