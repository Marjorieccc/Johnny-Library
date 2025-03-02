import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const btnStyle =
  "disabled:opacity-50 border border-primary-red rounded-md text-primary-red text-base font-bold py-2 px-4 hover:bg-primary-red hover:text-white focus:outline-none focus:ring focus:ring-focus-blue-300 active:bg-white";

export default function Auth0LoginRedirectBtn() {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Reset the button if Auth0 indicates it's no longer loading
  useEffect(() => {
    if (!isLoading && isLoggingIn) {
      setIsLoggingIn(false);
    }
  }, [isLoading]);

  function handleLogin() {
    setIsLoggingIn(true);
    const currentUrl = window.location.href;

    // Start the login process
    loginWithRedirect({
      appState: { returnTo: currentUrl },
    });

    // Fallback reset timer in case redirect doesn't happen
    setTimeout(() => {
      setIsLoggingIn(false);
    }, 8000);
  }

  return (
    <button
      className={btnStyle}
      onClick={handleLogin}
      disabled={isLoggingIn}
      aria-busy={isLoggingIn}
    >
      {isLoggingIn ? "Logging in..." : "Please Log in"}
    </button>
  );
}
