import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AccountNav from "../component/account/AccountNav";
import { useAccountDetails } from "../context/AccountDetailsProvider"

export default function AccountPage() {
  const { getAccountDetails } = useAccountDetails();
  useEffect(function () {
    getAccountDetails();
  }, []);

  return (
    <div className="mx-5 lg:mx-10 ">
      <AccountNav />
      <Outlet />
    </div>
  );
}
