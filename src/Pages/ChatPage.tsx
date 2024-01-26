import React from "react";
import SideBarLeft from "../Components/SideBarLeft";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ChatArea from "../Components/ChatArea";
import SideBarRight from "../Components/SideBarRight";
const nochat = require("../Assets/nochat.jpg");

type Props = {};

function ChatPage({}: Props) {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3">
      <SideBarLeft />
      {currentSelectedChat.id ? (
        <>
          <ChatArea />
          <SideBarRight />
        </>
      ) : (
        <div className="hidden lg:block flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden">
          <img
            src={nochat}
            alt="no chat"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
