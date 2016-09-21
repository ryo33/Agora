defmodule Agora.WatchUserTest do
  use Agora.ModelCase

  alias Agora.WatchUser

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = WatchUser.changeset(%WatchUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = WatchUser.changeset(%WatchUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
