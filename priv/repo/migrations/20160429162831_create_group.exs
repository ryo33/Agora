defmodule Agora.Repo.Migrations.CreateGroup do
  use Ecto.Migration

  def change do
    create table(:groups) do
      add :name, :string
      add :account_id, references(:accounts, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :parent_group_id, references(:groups, on_delete: :nothing)

      timestamps
    end
    create index(:groups, [:account_id])
    create index(:groups, [:user_id])
    create index(:groups, [:parent_group_id])

  end
end
