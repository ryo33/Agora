defmodule Agora.Title do
  @max_length 20

  def ellipsize(text) do
    if String.length(text) > @max_length do
      String.slice(text, 0, @max_length - 1) <> "..."
    else
      text
    end
  end

  def format_title(title) do
    "#{title} - Agoraful"
  end
end
