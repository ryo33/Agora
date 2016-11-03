defmodule Agora.PostLogTest do
  use Agora.ModelCase

  alias Agora.PostLog

  @valid_attrs %{action: "some content", body: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PostLog.changeset(%PostLog{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PostLog.changeset(%PostLog{}, @invalid_attrs)
    refute changeset.valid?
  end
end
