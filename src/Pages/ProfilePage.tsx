import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import avatarGenerator from "../utils/avatarGenerator";
import { toastErr, toastWarn } from "../utils/toast";
import { BE_saveProfile } from "../Backend/Queries";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [avatar, setAvatar] = useState("");

  const [saveProfileLoading, setSaveProfileLoading] = useState(false);
  const [deleteAccLoading, setDeleteAccLoading] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setEmail(currentUser.email);
    setUsername(currentUser.username);
  }, [currentUser]);

  const handleAvatarGenerate = () => {
    setAvatar(avatarGenerator());
  };

  const handleSaveProfile = async () => {
    if (!email || !username) toastErr("Email or username can't be empty!");

    let temp_pw = password;
    if (temp_pw && temp_pw !== confirmPW) {
      toastErr("Passwords must match!");
      temp_pw = "";
    }

    let temp_email = email;
    if (temp_email === currentUser.email) temp_email = "";

    let temp_user = username;
    if (temp_user === currentUser.username) temp_user = "";

    let temp_avatar = avatar;
    if (temp_avatar === currentUser.img) temp_avatar = "";

    if (temp_email || temp_user || temp_pw || temp_avatar) {
      await BE_saveProfile(
        dispatch,
        {
          email: temp_email,
          username: temp_user,
          password: temp_pw,
          img: temp_avatar,
        },
        setSaveProfileLoading
      );
    } else toastWarn("Nothing to update");
  };

  return (
    <div className="bg-white flex flex-col gap-5 shadow-md max-w-2xl rounded-xl py-5 px-6 md:p-10 md:m-auto m-5 md:mt-10">
      <div className="relative self-center" onClick={handleAvatarGenerate}>
        <img
          src={avatar || currentUser.img}
          alt={currentUser.username}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring-2 ring-gray-300 cursor-pointer hover:shadow-lg"
        />
        <span className="absolute top-7 md:top-6 left-28 md:left-40 w-5 h-5 border-2 border-gray-800 rounded-full bg-green-400"></span>
      </div>
      <p className="text-gray-400 text-sm text-center">
        Note: Click on image to temporary change it, then save profile. You can
        leav password and username as they are if you don't want to change them
      </p>
      <div className="flex flex-col gap-2">
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <Input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="confirmPW"
          type="password"
          onChange={(e) => setConfirmPW(e.target.value)}
        />
        <Button
          text="Update Profile"
          onClick={handleSaveProfile}
          loading={saveProfileLoading}
        />
        <Button text="Delete Account" secondary />
      </div>
    </div>
  );
}

export default ProfilePage;
