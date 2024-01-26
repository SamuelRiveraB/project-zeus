import React from "react";
import SideBarLeft from "../Components/SideBarLeft";
const nochat = require("../Assets/nochat.jpg");

type Props = {};

function ChatPage({}: Props) {
  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3">
      <SideBarLeft />
      <div className="hidden lg:block flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden">
        <img
          src={nochat}
          alt="no chat"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default ChatPage;
