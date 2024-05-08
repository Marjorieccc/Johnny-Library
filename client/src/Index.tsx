import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home";
import HomeContent from "./pages/HomeContent";
import ExplorePage from "./pages/Explore";
import ResourceDetailPage from "./pages/ResourceDetail";
import Auth0ProviderWithHistory from "./component/auth0/Auth0Provider";
import AccountDetailsProvider from "./context/AccountDetailsProvider";
import AccountPage from "./pages/Account";
import NotFoundPage from "./pages/NotFound";
import RoomFilter from "./pages/service/Room";
import RoomDetails from "./pages/service/RoomDetails";
import AccountReservation from "./component/account/AccountReservation";
import AccountRoomBooking from "./component/account/AccountRoomBooking";


export default function Index() {
  return (
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
              <Route path="account" element={<AccountPage />}>
                <Route index element={<Navigate replace to="reservation" />} />
                <Route path="reservation" element={<AccountReservation />} />
                <Route path="roomBooking" element={<AccountRoomBooking />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AccountDetailsProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
}
