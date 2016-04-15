defmodule Agora.Repo.Migrations.CreateAccount do
  use Ecto.Migration

  def change do
    create table(:account) do
      add :provider, :string
      add :provided_id, :string
      add :name, :string

      timestamps
    end

  end
end
