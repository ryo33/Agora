defmodule Agora.Repo.Migrations.MakeUidUnique do
  use Ecto.Migration

  def change do
    drop index(:users, [:uid])
    create unique_index(:users, [:uid])
  end
end
