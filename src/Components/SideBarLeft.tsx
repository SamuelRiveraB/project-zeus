import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setCurrentSelectedChat, setIsChatsTab } from "../Redux/chatsSlice";
import Chats from "./Chats";
import Users from "./Users";
import { BE_getAllUsers } from "../Backend/Queries";
import { defaultUser } from "../Redux/userSlice";

type Props = {};

function SideBarLeft({}: Props) {
  const isChatsTab = useSelector((state: RootState) => state.chat.isChatsTab);
  const [usersLoading, setUsersLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const get = async () => {
      await BE_getAllUsers(dispatch, setUsersLoading);
    };
    get();
  }, []);

  const handleSelectUser = () => {
    dispatch(setIsChatsTab(false));
    dispatch(setCurrentSelectedChat(defaultUser));
  };
  return (
    <Sidebar
      className={`flex-[0.8] absolute md:relative z-10 w-[80%] h-[88%] md:h-full md:w-full`}
    >
      <div className="flex flex-col">
        <div className="flex sticky top-0 z-10">
          <p
            onClick={() => dispatch(setIsChatsTab(true))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Chats
          </p>

          <p
            onClick={handleSelectUser}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              !isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Users
          </p>
        </div>
        <div className="flex-1 flex flex-col py-2 max-h-ful overflow-scroll">
          {isChatsTab ? <Chats /> : <Users loading={usersLoading} />}
        </div>
      </div>
    </Sidebar>
  );
}

export default SideBarLeft;
