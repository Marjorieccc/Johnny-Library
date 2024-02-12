import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header/header";

export default function HomePage() {
  return (
    <main className="bg-gray-100 tracking-wider tracking-normal">
      <Header />
      <Outlet />
    </main>
  );
}