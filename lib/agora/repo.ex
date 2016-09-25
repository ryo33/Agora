defmodule Agora.Repo do
  use Ecto.Repo, otp_app: :agora
  import Ecto.Query, only: [from: 2]

  def exists(queryable) do
    query = Ecto.Query.from(x in queryable, select: 1, limit: 1) |> Ecto.Queryable.to_query
    case all(query) do
      [1] -> true
      [] -> false
    end
  end
end
