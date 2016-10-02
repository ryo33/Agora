defmodule Agora.ThreadUserTest do
  use Agora.ModelCase

  alias Agora.ThreadUser

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ThreadUser.changeset(%ThreadUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ThreadUser.changeset(%ThreadUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
