defmodule Agora.AccountChannelTest do
  use Agora.ChannelCase

  alias Agora.AccountChannel

  def get_socket do
    account = %Agora.Account{provider: "a", provided_id: "b", name: "c"}
    token = "token"
    {:ok, account} = Repo.insert(account)
    client = %{
      account: account,
      conn: nil,
    }
    Onetime.register(:channel_token, token, client)
    {:ok, socket} = connect(Agora.UserSocket, %{"token" => token})
    {socket, account}
  end

  setup do
    {socket, account} = get_socket
    {:ok, _, socket} = subscribe_and_join(socket, "account:#{account.id}", %{})
    {:ok, socket: socket}
  end

  test "add user", %{socket: socket} do
    uid = "UserId"
    name = "Name"
    push socket, "add_user", %{"uid" => uid, "name" => name}
    user = Repo.get_by(Agora.User, uid: uid)
    assert user.uid == uid
    assert user.name == name
    assert_broadcast "dispatch", %{actions: [%{
       type: "ADD_USER",
       user: %Agora.User{uid: uid, name: name}
     }]}
  end

  test "add current user", %{socket: socket} do
    uid = "UserId"
    name = "Name"
    user = %Agora.User{uid: uid, name: name, account_id: socket.assigns.account.id}
    {:ok, user} = Repo.insert(user)
    id = user.id
    push socket, "set_current_user", id
    assert_push "dispatch", %{actions: [%{
       type: "SET_CURRENT_USER",
       user: id
     }]}
  end
end
