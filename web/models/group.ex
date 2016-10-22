defmodule Agora.Group do
  use Agora.Web, :model
  @derive {Poison.Encoder, only: [
    :name, :user_id, :id, :parent_group_id,
    :group_limited, :thread_limited, :join_limited,
    :members, :threads, :groups,
    :inserted_at, :updated_at
  ]}

  schema "groups" do
    field :name, :string
    field :group_limited, :boolean
    field :thread_limited, :boolean
    field :join_limited, :boolean
    field :read_limited, :boolean
    belongs_to :account, Agora.Account
    belongs_to :user, Agora.User
    belongs_to :parent_group, Agora.Group

    has_many :threads, Agora.Thread
    has_many :members, Agora.Member
    has_many :groups, Agora.Group

    timestamps
  end

  @required_fields ~w(name account_id user_id)
  @optional_fields ~w(
                      parent_group_id
                      group_limited thread_limited
                      join_limited read_limited
                    )

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:name, min: 1)
  end

  def get_title_text(id) do
    import Agora.Title
    group = Agora.Group
    |> where([t], t.id == ^id)
    |> preload(^preload_param)
    |> Repo.one!()
    |> format

    name = ellipsize(group.name)
    "#{name} (#{group.threads}, #{group.groups}, #{group.members})"
    |> format_title
  end

  def preload_param do
    members_query = Agora.Member |> select([m], m.id)
    threads_query = fn ids ->
      Agora.Thread
      |> select([t], %{group_id: t.parent_group_id})
      |> where([t], t.parent_group_id in ^ids)
      |> Repo.all
    end
    groups_query = fn ids ->
      Agora.Group
      |> select([g], %{group_id: g.parent_group_id})
      |> where([g], g.parent_group_id in ^ids)
      |> Repo.all
    end
    [members: members_query,
     threads: threads_query,
     groups: groups_query]
  end

  def format(group) do
    group
    |> Map.update!(:members, fn ids -> length(ids) end)
    |> Map.update!(:threads, fn ids -> length(ids) end)
    |> Map.update!(:groups, fn ids -> length(ids) end)
  end

  def exists?(id) do
    query = from g in Agora.Group,
      where: g.id == ^id,
      limit: 1,
      select: count(g.id)
    case Repo.all(query) do
      [1] -> true
      _ -> false
    end
  end
end
