import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="tracking-wider">
        <Header />
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
