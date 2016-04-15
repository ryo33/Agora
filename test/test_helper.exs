ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Agora.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Agora.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Agora.Repo)

