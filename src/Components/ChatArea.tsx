import React, { useEffect, useRef, useState } from "react";
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
import { BE_getMsgs, BE_sendMsgs, getStorageUser } from "../Backend/Queries";
import { MessagesLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { toastInfo } from "../utils/toast";

function ChatArea() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const messages = useSelector((state: RootState) => state.chat.currentMsgs);
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState("");
  const [getMsgsLoading, setGetMsgsLoading] = useState(false);
  const [createMsgLoading, setCreateMsgLoading] = useState(false);
  const chatId = currentSelectedChat.chatId;

  useEffect(() => {
    const get = async () => {
      if (chatId) await BE_getMsgs(dispatch, chatId, setGetMsgsLoading);
    };
    get();
  }, [currentSelectedChat.id]);

  const handleSendMsg = async () => {
    if (msg.trim()) {
      const data = {
        senderId: getStorageUser().id,
        content: msg,
      };
      setMsg("");
      if (chatId) await BE_sendMsgs(chatId, data, setCreateMsgLoading);
      if (bottomRef) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else toastInfo("Enter some text message");
  };

  const checkEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSendMsg();
    }
  };

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2">
      {getMsgsLoading ? (
        <MessagesLoader />
      ) : (
        <div className="flex-1 flex flex-col ma-h-screen overflow-y-scroll">
          <FlipMove className="flex-1 flex flex-col gap-5">
            {messages.map((msg) => {
              const myId = getStorageUser().id;
              if (msg.senderId == myId) {
                return (
                  <div
                    key={msg.id}
                    className="bg-gradient-to-r from-myBlue to-myPink text-white text-sm self-end max-w-md shadow-md py-3 px-10 rounded-t-full rounded-bl-full border-2"
                  >
                    {msg.content}
                  </div>
                );
              } else {
                return (
                  <div
                    key={msg.id}
                    className="bg-gray-300 text-sm self-start max-w-md shadow-md py-3 px-10 rounded-t-full rounded-br-full border-2"
                  >
                    {msg.content}
                  </div>
                );
              }
            })}
          </FlipMove>
          <div ref={bottomRef} className="pb-36 flex"></div>
        </div>
      )}

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
            onKeyDown={checkEnter}
            disabled={createMsgLoading}
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
          <Icon
            onClick={handleSendMsg}
            Name={BsFillSendFill}
            className="text-gray-500"
            loading={createMsgLoading}
          ></Icon>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
