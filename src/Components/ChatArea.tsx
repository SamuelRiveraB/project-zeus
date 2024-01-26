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
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

type Props = {};

function ChatArea({}: Props) {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const [msg, setMsg] = useState("");

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2">
      <div className="flex-1 border-2 border-black"></div>
      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-e-gray-300">
          <Icon
            Name={BsFillPeopleFill}
            className="text-gray-500 block md:hidden"
            reduceOpacityOnHover
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
            className="text-gray-500 hidden md:block "
            reduceOpacityOnHover
          ></Icon>
          <Icon
            Name={BsFillCameraFill}
            className="text-gray-500 hidden md:block"
            reduceOpacityOnHover
          ></Icon>
        </div>
        <div className="flex items-center justify-center">
          <Icon
            Name={BsFillSendFill}
            className="text-gray-500 hidden md:block"
          ></Icon>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
