import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home";
import HomeContent from "./pages/homeContent";
import ExplorePage from "./pages/explore";
import ResourceDetailPage from "./pages/resourceDetail";
import Auth0ProviderWithHistory from "./component/auth0/Auth0Provider";
import AccountDetailsProvider from "./context/AccountDetailsProvider";
import "./index.css";
import RoomFilter from "./pages/service/room";
import RoomDetails from "./pages/service/roomDetails";
import Account from "./component/account/account";
import AccountReservation from "./component/account/accountReservation";
import AccountRoomBooking from "./component/account/accountRoomBooking";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AccountDetailsProvider>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomeContent />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="services/rooms" element={<RoomFilter />} />
            <Route path="services/rooms/:id" element={<RoomDetails />} />
            <Route
              path="resource/:resource_id"
              element={<ResourceDetailPage />}
            />
            <Route path="account" element={<Account />}>
              <Route index element={<Navigate replace to="reservation" />} />
              <Route path="reservation" element={<AccountReservation />} />
              <Route path="roomBooking" element={<AccountRoomBooking />} />
            </Route>
          </Route>
        </Routes>
      </AccountDetailsProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
);
