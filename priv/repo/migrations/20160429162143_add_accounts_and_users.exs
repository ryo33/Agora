defmodule Agora.Repo.Migrations.AddAccountsAndUsers do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :provider, :string
      add :provided_id, :string
      add :name, :string

      timestamps
    end

    create table(:users) do
      add :uid, :string
      add :name, :string
      add :account_id, references(:accounts, on_delete: :nothing)

      timestamps
    end
    create index(:users, [:account_id])
    create unique_index(:users, [:uid])
  end
end
