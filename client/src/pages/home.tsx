import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../component/footer/footer";

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
      <main className="justify-centertracking-wider flex flex-col items-center">
        <Header />
        <div className="mx-auto mt-20 max-w-screen-2xl lg:py-10">
          <Outlet />
        </div>
        <Footer />
      </main>
    </QueryClientProvider>
  );
}
