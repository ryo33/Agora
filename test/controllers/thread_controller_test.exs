defmodule Agora.ThreadControllerTest do
  use Agora.ConnCase

  alias Agora.Thread
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, thread_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    thread = Repo.insert! %Thread{}
    conn = get conn, thread_path(conn, :show, thread)
    assert json_response(conn, 200)["data"] == %{"id" => thread.id,
      "name" => thread.name,
      "account_id" => thread.account_id,
      "user_id" => thread.user_id,
      "parent_group_id" => thread.parent_group_id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, thread_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, thread_path(conn, :create), thread: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Thread, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, thread_path(conn, :create), thread: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    thread = Repo.insert! %Thread{}
    conn = put conn, thread_path(conn, :update, thread), thread: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Thread, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    thread = Repo.insert! %Thread{}
    conn = put conn, thread_path(conn, :update, thread), thread: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    thread = Repo.insert! %Thread{}
    conn = delete conn, thread_path(conn, :delete, thread)
    assert response(conn, 204)
    refute Repo.get(Thread, thread.id)
  end
end
