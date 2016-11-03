defmodule Agora.ThreadLogTest do
  use Agora.ModelCase

  alias Agora.ThreadLog

  @valid_attrs %{action: "some content", body: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ThreadLog.changeset(%ThreadLog{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ThreadLog.changeset(%ThreadLog{}, @invalid_attrs)
    refute changeset.valid?
  end
end
