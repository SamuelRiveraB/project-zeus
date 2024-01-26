import React, { useState } from "react";
import Icon from "./Icon";
import {
  BsFillSendFill,
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setSidebarOpen } from "../Redux/chatsSlice";

type Props = {};

function ChatArea({}: Props) {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState("");

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2">
      <div className="flex-1 border-2 border-black flex flex-col ma-h-screen overflow-y-scroll">
        <div className="bg-gradient-to-r from-myBlue to-myPink text-white text-sm self-end max-w-md shadow-md py-3 px-10 rounded-t-full rounded-bl-full border-2">
          My message
        </div>
        <div className="bg-gray-300 text-sm self-start max-w-md shadow-md py-3 px-10 rounded-t-full rounded-br-full border-2">
          My message
        </div>
      </div>
      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-e-gray-300">
          <Icon
            Name={BsFillPeopleFill}
            className="text-gray-500 block md:hidden"
            reduceOpacityOnHover
            onClick={() => dispatch(setSidebarOpen())}
          ></Icon>
          <Icon
            Name={BsFillEmojiSunglassesFill}
            className="text-gray-500 hidden md:block"
            reduceOpacityOnHover
          ></Icon>
          <Input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            name={`Enter message to ${currentSelectedChat.username}`}
            className="border-none outiline-none text-sm md:text-[15px]"
          />
          <Icon
            Name={ImAttachment}
            className="text-gray-500"
            reduceOpacityOnHover
          ></Icon>
          <Icon
            Name={BsFillCameraFill}
            className="text-gray-500"
            reduceOpacityOnHover
          ></Icon>
        </div>
        <div className="flex items-center justify-center">
          <Icon Name={BsFillSendFill} className="text-gray-500"></Icon>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
