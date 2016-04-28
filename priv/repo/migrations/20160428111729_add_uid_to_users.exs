defmodule Agora.Repo.Migrations.AddUidToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :uid, :string
    end
    create index(:users, [:uid])
  end
end
