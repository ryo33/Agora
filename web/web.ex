defmodule Agora.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Agora.Web, :controller
      use Agora.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def channel_controller do
    quote do
      use Agora.ChannelController
      import Ecto.Query
      alias Ecto.Changeset

      alias Agora.Repo

      alias Agora.Account
      alias Agora.User
      alias Agora.Thread
      alias Agora.Post
      alias Agora.Group
      alias Agora.Member
      alias Agora.Watchlist

      alias Agora.WatchThread
      alias Agora.WatchGroup
    end
  end

  def model do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      alias Agora.Repo
    end
  end

  def controller do
    quote do
      use Phoenix.Controller

      alias Agora.Repo
      import Ecto
      import Ecto.Query, only: [from: 1, from: 2]

      import Agora.Router.Helpers
      import Agora.Gettext
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Agora.Router.Helpers
      import Agora.ErrorHelpers
      import Agora.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Agora.Repo
      import Ecto
      import Ecto.Query
      import Agora.Gettext

      alias Agora.ChannelController
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
