defmodule Agora.Repo.Migrations.CreateWatchGroup do
  use Ecto.Migration

  def change do
    create table(:watchgroups) do
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :watchlist_id, references(:watchlists, on_delete: :nothing)
      add :group_id, references(:groups, on_delete: :nothing)

      timestamps()
    end
    create index(:watchgroups, [:account_id])
    create index(:watchgroups, [:user_id])
    create index(:watchgroups, [:watchlist_id])
    create index(:watchgroups, [:group_id])

  end
end
