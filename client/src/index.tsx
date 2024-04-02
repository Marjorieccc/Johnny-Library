import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import ExplorePage from "./pages/explore";
import "./index.css";
import RoomFilter from "./pages/service/room";
import RoomDetails from "./pages/service/roomDetails";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="explore" element={<ExplorePage />} />
        <Route path="services/rooms" element={<RoomFilter />} />
        <Route path="services/rooms/:id" element={<RoomDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
