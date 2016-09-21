defmodule Agora.Repo.Migrations.CreateWatchlist do
  use Ecto.Migration

  def change do
    create table(:watchlists) do
      add :name, :string
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:watchlists, [:account_id])
    create index(:watchlists, [:user_id])

  end
end
