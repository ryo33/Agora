defmodule Agora.Repo.Migrations.CreateThreadWebhook do
  use Ecto.Migration

  def change do
    create table(:thread_webhooks) do
      add :url, :string
      add :on_post, :boolean, default: true, null: true
      add :on_join, :boolean, default: true, null: true
      add :on_leave, :boolean, default: true, null: true
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:thread_webhooks, [:user_id])

  end
end
