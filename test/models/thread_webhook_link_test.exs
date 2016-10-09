defmodule Agora.ThreadWebhookLinkTest do
  use Agora.ModelCase

  alias Agora.ThreadWebhookLink

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ThreadWebhookLink.changeset(%ThreadWebhookLink{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ThreadWebhookLink.changeset(%ThreadWebhookLink{}, @invalid_attrs)
    refute changeset.valid?
  end
end
