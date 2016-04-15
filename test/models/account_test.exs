defmodule Agora.AccountTest do
  use Agora.ModelCase

  alias Agora.Account

  @valid_attrs %{name: "some content", provided_id: "some content", provider: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Account.changeset(%Account{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Account.changeset(%Account{}, @invalid_attrs)
    refute changeset.valid?
  end
end
