import React from "react";
import { UserLoader } from "./Loaders";

type Props = { loading: boolean };

function Users({ loading }: Props) {
  return (
    <div>
      {loading ? (
        <UserLoader />
      ) : Users.length === 0 ? (
        <div className="p-10">
          No users registered apart from you, tell others to register and start
          chatting
        </div>
      ) : (
        <div>"users here"</div>
      )}
    </div>
  );
}

export default Users;
