defmodule Agora.LayoutView do
  use Agora.Web, :view

  def og(assigns, key, default) do
    case get_in(assigns, [:og, key]) do
      nil -> default
      og -> og
    end
  end
end
