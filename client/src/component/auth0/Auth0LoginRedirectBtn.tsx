import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const btnStyle =
  "disabled:opacity-50 border border-red-800 rounded-md text-red-800 text-base font-bold py-2 px-4  hover:bg-red-800 hover:text-white focus:outline-none  active:bg-white";

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
