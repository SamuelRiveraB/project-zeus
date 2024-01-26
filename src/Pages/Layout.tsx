import React from "react";
import { Outlet } from "react-router";
import Header from "../Components/Header";
import Alert from "../Components/Alert";

type Props = {};

function Layout({}: Props) {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-pattern flex-1 max-h-[92%] md:max-h-[94%] overflow-y-scroll">
        <Outlet />
        <Alert />
      </div>
    </div>
  );
}

export default Layout;
