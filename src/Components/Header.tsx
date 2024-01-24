import React from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
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
      <AddListBoard />
    </div>
  );
}

export default Header;
