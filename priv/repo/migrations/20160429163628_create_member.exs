defmodule Agora.Repo.Migrations.CreateMember do
  use Ecto.Migration

  def change do
    create table(:members) do
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :group_id, references(:groups, on_delete: :nothing)

      timestamps
    end
    create index(:members, [:account_id])
    create index(:members, [:user_id])
    create index(:members, [:group_id])

  end
end
