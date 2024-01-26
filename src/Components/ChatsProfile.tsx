import React, { useEffect, useState } from "react";
import { chatType, userType } from "../Types";
import { getUserInfo } from "../Backend/Queries";
import { toastErr } from "../utils/toast";
import UserHeaderProfile from "./UserHeaderProfile";

type Props = { userId?: string; chat: chatType };

function ChatsProfile({ userId, chat }: Props) {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<userType | undefined>();

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const usr = await getUserInfo(userId, setUserLoading);
        setUser(usr);
      } else toastErr("ChatsProfile: user not found");
    };
    getUser();
  }, [userId]);

  const handleSelectedChat = () => {};

  //return <UserHeaderProfile handleClick={handleSelectedChat} />;
  return <h2>user</h2>;
}

export default ChatsProfile;
