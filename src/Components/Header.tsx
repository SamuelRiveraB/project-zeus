import React from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
const logo = require("../Assets/logo.png");

type Props = {};

function Header({}: Props) {
  return (
    <div className="drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white flex flex-wrap sm:flex-row gap-5 items-center justify-between">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <AddListBoard />
        <Icon Name={BsFillChatFill} ping={true} />
        <Icon Name={FiList} />
        <UserHeaderProfile />
      </div>
    </div>
  );
}

export default Header;
