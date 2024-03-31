import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import HomeContent from "./pages/homeContent";
import ExplorePage from "./pages/explore";
import ResourceDetailPage from "./pages/resourceDetail";
import Auth0ProviderWithHistory from "./component/auth0/Auth0Provider";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<HomeContent />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route
            path="resource/:resource_id"
            element={<ResourceDetailPage />}
          />
        </Route>
      </Routes>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
);
