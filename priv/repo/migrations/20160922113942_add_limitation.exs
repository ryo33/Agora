defmodule Agora.Repo.Migrations.AddLimitation do
  use Ecto.Migration

  def change do
    alter table(:threads) do
      add :post_limited, :boolean
      add :read_limited, :boolean
    end
    alter table(:groups) do
      add :group_limited, :boolean
      add :thread_limited, :boolean
      add :join_limited, :boolean
      add :read_limited, :boolean
    end
  end
end
