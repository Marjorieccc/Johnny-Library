import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "primeicons/primeicons.css";

export default function LogoutBtn() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="pi pi-sign-out" onClick={handleLogout}>
    </button>
  );
}
