defmodule Agora.Repo.Migrations.CreateWatchUser do
  use Ecto.Migration

  def change do
    create table(:watchusers) do
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :watchlist_id, references(:watchlists, on_delete: :nothing)
      add :target_user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:watchusers, [:account_id])
    create index(:watchusers, [:user_id])
    create index(:watchusers, [:watchlist_id])
    create index(:watchusers, [:target_user_id])

  end
end
