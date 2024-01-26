import React from "react";
import Sidebar from "./Sidebar";

type Props = {};

function SideBarLeft({}: Props) {
  return (
    <Sidebar className={`flex-[0.8] w-[80%] h-[80%] md:h-full md:w-full`}>
      <div className="flex flex-col">
        <div className="flex sticky top-0 z-10">
          <p className={`p-5 flex-1 text-center font-bold cursor-pointer`}>
            Chats
          </p>
        </div>
        <p className={`p-5 flex-1 text-center font-bold cursor-pointer`}>
          Users
        </p>
      </div>
    </Sidebar>
  );
}

export default SideBarLeft;
