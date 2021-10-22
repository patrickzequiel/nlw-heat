defmodule HeatTagsWeb.MessagesController do
  use HeatTagsWeb, :controller

  def create(conn, params) do
    IO.inspect(params)

    text(conn, "Recebi a requisição")

    # Uma vez recebido as infos do post, inserir no banco de dados
  end
end
