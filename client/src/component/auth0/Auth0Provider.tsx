import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import auth0ConfigJson from "./authConfig.json";

const auth0Config = {
  domain: auth0ConfigJson.domain || "",
  clientId: auth0ConfigJson.clientId || "",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: auth0ConfigJson.audience || "",
    scope: auth0ConfigJson.scope || "",
  },
};

export default function Auth0ProviderWithHistory({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  function onRedirectCallback(appState: any) {
    const defaultReturnTo = '/';  
    const returnTo = appState?.returnTo || window.location.origin + defaultReturnTo;
    const baseUrl = new URL(window.location.origin);
    const returnToUrl = new URL(returnTo, baseUrl); 
    const relativePath = returnToUrl.pathname + returnToUrl.search + returnToUrl.hash;

    navigate(relativePath);
  }

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
