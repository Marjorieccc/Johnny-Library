import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const btnStyle =
  "disabled:opacity-50 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800";

export default function Auth0LoginRedirectBtn() {
  const { loginWithRedirect } = useAuth0();

  function handleLogin() {
    const currentUrl = window.location.href;
    loginWithRedirect({ appState: { returnTo: currentUrl } });
  }

  return (
    <button className={btnStyle} onClick={handleLogin}>
      Please Log in
    </button>
  );
}
