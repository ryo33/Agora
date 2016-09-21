defmodule Agora.WatchGroupTest do
  use Agora.ModelCase

  alias Agora.WatchGroup

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = WatchGroup.changeset(%WatchGroup{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = WatchGroup.changeset(%WatchGroup{}, @invalid_attrs)
    refute changeset.valid?
  end
end
