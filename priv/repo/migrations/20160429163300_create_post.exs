defmodule Agora.Repo.Migrations.CreatePost do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :name, :string
      add :text, :string
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :thread_id, references(:threads, on_delete: :nothing)
      add :post_id, references(:posts, on_delete: :nothing)

      timestamps
    end
    create index(:posts, [:account_id])
    create index(:posts, [:user_id])
    create index(:posts, [:thread_id])
    create index(:posts, [:post_id])

  end
end
