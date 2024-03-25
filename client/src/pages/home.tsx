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
        <div className="mt-40 items-center justify-center px-10 py-10">
          <Outlet />
        </div>
      </main>
    </QueryClientProvider>
  );
}
