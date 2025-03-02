import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "primeicons/primeicons.css";

export default function LoginBtn() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function handleAccountLogin() {
    loginWithRedirect();
  }

  if (isAuthenticated) {
    return (
      <div>
        <Link
          to="/account"
          className="no-underline focus:outline-none focus:ring focus:ring-primary-red rounded p-1"
          aria-label="View your account"
        >
          <span
            className="pi pi-user text-primary-red"
            aria-hidden="true"
          ></span>
        </Link>
      </div>
    );
  }

  return (
    <button
      className="no-underline focus:outline-none focus:ring focus:ring-primary-red rounded p-1"
      onClick={handleAccountLogin}
      style={{ cursor: "pointer" }}
      aria-label="Log in"
    >
      <span className="pi pi-user text-primary-red" aria-hidden="true"></span>
    </button>
  );
}
