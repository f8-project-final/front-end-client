import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const nav = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!localUser.email) {
      nav("/login");
    }
  }, []);
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full h-screen flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
