import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setIsChatsTab } from "../Redux/chatsSlice";
import Chats from "./Chats";
import Users from "./Users";

type Props = {};

function SideBarLeft({}: Props) {
  const isChatsTab = useSelector((state: RootState) => state.chat.isChatsTab);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Sidebar className={`flex-[0.4] w-[80%] h-[80%] md:h-full md:w-full`}>
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
            onClick={() => dispatch(setIsChatsTab(false))}
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
          {isChatsTab ? <Chats /> : <Users />}
        </div>
      </div>
    </Sidebar>
  );
}

export default SideBarLeft;
