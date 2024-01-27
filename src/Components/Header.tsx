import React, { useEffect, useState } from "react";
import Button from "./Button";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { BE_getChats, BE_signOut } from "../Backend/Queries";
import Spinner from "./Spinner";
const logo = require("../Assets/logo.png");

type Props = {};

function Header({}: Props) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasNewMsg = useSelector((state: RootState) => state.chat.hasNewMsg);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser?.id) goTo("/auth");
    else {
      goTo(`${location.pathname}`);
    }

    const get = async () => {
      await BE_getChats(dispatch);
    };
    get();
  }, []);

  const handleSignout = () => {
    BE_signOut(dispatch, goTo, setLogoutLoading);
  };

  const handleGoToPage = (page: string) => {
    goTo(page);
    setCurrentPage(page);
  };

  const setCurrentPage = (page: string) => {
    localStorage.setItem("zeus_page", page);
  };

  const getCurrentPage = () => {
    return localStorage.getItem("zeus_page");
  };

  return (
    <div className="z-10 drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white flex flex-wrap sm:flex-row gap-5 items-center justify-between">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon Name={FiList} onClick={() => handleGoToPage("")} />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon Name={FiList} onClick={() => handleGoToPage("")} />
            <Icon
              Name={BsFillChatFill}
              onClick={() => handleGoToPage("chat")}
              ping={hasNewMsg}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              Name={BsFillChatFill}
              onClick={() => handleGoToPage("chat")}
              ping={hasNewMsg}
            />
          </>
        )}

        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max z-1000">
            <ul className="w-ful bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <li
                onClick={() => handleGoToPage("profile")}
                className="hover:bg-gray-200 py-2 px-4 block cursor-pointer"
              >
                Profile
              </li>
              <li
                onClick={() => !logoutLoading && handleSignout()}
                className={`hover:bg-gray-200 py-2 px-4 cursor-pointer flex items-center gap-4 ${
                  logoutLoading && "cursor-wait"
                }`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
