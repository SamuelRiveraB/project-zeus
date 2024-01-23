import React from "react";
import Login from "../Components/Login";

const LoginPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center p-10">
      <div className="h-full w-full bg-gradient-to-r from-myBlue to-myPink absolute top-0 -z-10 opacity-70" />
      <div className="h-full w-full absolute bg-pattern -z-20 top-0" />
      <Login />
    </div>
  );
};

export default LoginPage;
