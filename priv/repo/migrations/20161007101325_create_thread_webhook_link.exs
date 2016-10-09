defmodule Agora.Repo.Migrations.CreateThreadWebhookLink do
  use Ecto.Migration

  def change do
    create table(:thread_webhook_links) do
      add :thread_webhook_id, references(:thread_webhooks, on_delete: :delete_all)
      add :thread_id, references(:threads, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:thread_webhook_links, [:thread_webhook_id])
    create index(:thread_webhook_links, [:thread_id])
    create index(:thread_webhook_links, [:user_id])

  end
end
