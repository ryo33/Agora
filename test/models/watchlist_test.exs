defmodule Agora.WatchlistTest do
  use Agora.ModelCase

  alias Agora.Watchlist

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Watchlist.changeset(%Watchlist{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Watchlist.changeset(%Watchlist{}, @invalid_attrs)
    refute changeset.valid?
  end
end
