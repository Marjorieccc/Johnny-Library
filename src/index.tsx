import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./page/home";
import ExplorePage from "./page/exploreBook";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="explore" element={<ExplorePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
