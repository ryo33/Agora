defmodule Agora.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :account_id, references(:account, on_delete: :nothing)

      timestamps
    end
    create index(:users, [:account_id])

  end
end
