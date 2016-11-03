defmodule Agora.GroupLogTest do
  use Agora.ModelCase

  alias Agora.GroupLog

  @valid_attrs %{action: "some content", body: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = GroupLog.changeset(%GroupLog{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = GroupLog.changeset(%GroupLog{}, @invalid_attrs)
    refute changeset.valid?
  end
end
