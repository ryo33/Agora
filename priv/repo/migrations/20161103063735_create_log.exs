defmodule Agora.Repo.Migrations.CreateLog do
  use Ecto.Migration

  def change do
    create table(:group_logs) do
      add :action, :string
      add :body, :string, size: 256
      add :group_id, references(:groups, on_delete: :nothing)

      timestamps()
    end
    create index(:group_logs, [:group_id])

    create table(:thread_logs) do
      add :action, :string
      add :body, :string, size: 256
      add :thread_id, references(:threads, on_delete: :nothing)

      timestamps()
    end
    create index(:thread_logs, [:thread_id])

    create table(:post_logs) do
      add :action, :string
      add :body, :string, size: 4096
      add :post_id, references(:posts, on_delete: :nothing)

      timestamps()
    end
    create index(:post_logs, [:post_id])
  end
end
