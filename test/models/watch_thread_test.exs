defmodule Agora.WatchThreadTest do
  use Agora.ModelCase

  alias Agora.WatchThread

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = WatchThread.changeset(%WatchThread{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = WatchThread.changeset(%WatchThread{}, @invalid_attrs)
    refute changeset.valid?
  end
end
