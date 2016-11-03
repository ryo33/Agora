defmodule Agora.ThreadLog do
  use Agora.Web, :model

  schema "thread_logs" do
    field :action, :string
    field :body, :string
    belongs_to :thread, Agora.Thread

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:action, :body])
    |> validate_required([:action, :body])
  end

  def log(thread_id, action, body) do
    struct = %__MODULE__{
      thread_id: thread_id,
      action: action,
      body: body
    }
    Agora.Repo.insert(struct)
  end
end
