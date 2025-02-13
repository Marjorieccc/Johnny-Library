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
        <Link to="/account" className="no-underline">
          <span className="pi pi-user"></span>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="no-underline"
      onClick={handleAccountLogin}
      style={{ cursor: "pointer" }}
    >
      <span className="pi pi-user"></span>
    </div>
  );
}
