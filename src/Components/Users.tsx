import React from "react";

type Props = { loading: boolean };

function Users({ loading }: Props) {
  return <div>{loading ? "Loading" : "users here"}</div>;
}

export default Users;
