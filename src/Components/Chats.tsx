import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ChatsProfile from "./ChatsProfile";
import { iCreatedChat } from "../Backend/Queries";

function Chats() {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return chats.length === 0 ? (
    <div className="p-10">No chats yet for you, chose a user to chat with</div>
  ) : (
    <>
      {chats.map((c) => (
        <ChatsProfile
          chat={c}
          key={c.id}
          userId={iCreatedChat(c.senderId) ? c.receiverId : c.senderId}
        />
      ))}
    </>
  );
}

export default Chats;
