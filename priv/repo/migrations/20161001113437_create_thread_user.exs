defmodule Agora.Repo.Migrations.CreateThreadUser do
  use Ecto.Migration

  def change do
    create table(:thread_users) do
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :thread_id, references(:threads, on_delete: :nothing)

      timestamps()
    end
    create index(:thread_users, [:account_id])
    create index(:thread_users, [:user_id])
    create index(:thread_users, [:thread_id])

  end
end
