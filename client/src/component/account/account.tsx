import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AccountNav from "./accountNav";
import { useAccountDetails } from "../../context/accountDetailsProvider";

export default function Account() {
  const { getAccountDetails } = useAccountDetails();
  useEffect(function () {
    getAccountDetails();
  }, []);

  return (
    <div>
      <AccountNav />
      <Outlet />
    </div>
  );
}
