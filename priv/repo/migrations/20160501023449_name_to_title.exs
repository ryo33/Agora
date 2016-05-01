defmodule Agora.Repo.Migrations.NameToTitle do
  use Ecto.Migration

  def change do
    rename table(:posts), :name, to: :title
    rename table(:threads), :name, to: :title
  end
end
