defmodule Agora.Repo.Migrations.CreateWatchThread do
  use Ecto.Migration

  def change do
    create table(:watchthreads) do
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :watchlist_id, references(:watchlists, on_delete: :nothing)
      add :thread_id, references(:threads, on_delete: :nothing)

      timestamps()
    end
    create index(:watchthreads, [:account_id])
    create index(:watchthreads, [:user_id])
    create index(:watchthreads, [:watchlist_id])
    create index(:watchthreads, [:thread_id])

  end
end
