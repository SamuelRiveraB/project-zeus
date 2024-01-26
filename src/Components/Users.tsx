import React from "react";
import { UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import UserHeaderProfile from "./UserHeaderProfile";

type Props = { loading: boolean };

function Users({ loading }: Props) {
  const users = useSelector((state: RootState) => state.user.users);
  const handleStartChat = () => {};
  return loading ? (
    <UsersLoader />
  ) : users.length === 0 ? (
    <div className="p-10">
      No users registered apart from you, tell others to register and start
      chatting
    </div>
  ) : (
    <FlipMove>
      {users.map((u) => (
        <UserHeaderProfile
          handleClick={handleStartChat}
          key={u.id}
          user={u}
          otherUser
        />
      ))}
    </FlipMove>
  );
}

export default Users;
