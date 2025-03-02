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
    <button
      className="pi pi-sign-out text-primary-red focus:outline-none focus:ring focus:ring-primary-red rounded p-1"
      onClick={handleLogout}
      aria-label="Log out"
    ></button>
  );
}
