defmodule Agora.ThreadWebhookTest do
  use Agora.ModelCase

  alias Agora.ThreadWebhook

  @valid_attrs %{on_join: true, on_leave: true, on_post: true, url: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ThreadWebhook.changeset(%ThreadWebhook{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ThreadWebhook.changeset(%ThreadWebhook{}, @invalid_attrs)
    refute changeset.valid?
  end
end
