import React from "react";
import { userType } from "../Types";

type Props = {
  user: userType;
  handleClick?: () => void;
};

function UserHeaderProfile({ user, handleClick }: Props) {
  return (
    <div
      onClick={handleClick}
      className="flex items-center space-x-4 cursor-pointer"
    >
      <div className="relative">
        <img
          src={user.img}
          alt="User Profile"
          className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
        />
        <span className="absolute -top-1 left-7 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-800"></span>
      </div>
      <div className="hidden md:block">
        <div className="-mb-1">{user.username}</div>
        <div className="text-sm text-gray-300">
          Joined in {user.creationTime}
        </div>
      </div>
    </div>
  );
}

export default UserHeaderProfile;
