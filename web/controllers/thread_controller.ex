defmodule Agora.ThreadController do
  use Agora.Web, :controller

  alias Agora.Thread

  plug :scrub_params, "thread" when action in [:create, :update]

  def index(conn, _params) do
    threads = Repo.all(Thread)
    render(conn, "index.json", threads: threads)
  end

  def create(conn, %{"thread" => thread_params}) do
    changeset = Thread.changeset(%Thread{}, thread_params)

    case Repo.insert(changeset) do
      {:ok, thread} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", thread_path(conn, :show, thread))
        |> render("show.json", thread: thread)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Agora.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    thread = Repo.get!(Thread, id)
    render(conn, "show.json", thread: thread)
  end

  def update(conn, %{"id" => id, "thread" => thread_params}) do
    thread = Repo.get!(Thread, id)
    changeset = Thread.changeset(thread, thread_params)

    case Repo.update(changeset) do
      {:ok, thread} ->
        render(conn, "show.json", thread: thread)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Agora.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    thread = Repo.get!(Thread, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(thread)

    send_resp(conn, :no_content, "")
  end
end
