import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

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
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-none focus:ring focus:ring-blue-300"
      >
        Skip to main content
      </a>
      <div className="tracking-wider">
        <Header />
        <main
          id="main-content"
          className="mx-auto mt-20 max-w-screen-2xl lg:py-10"
          tabIndex={-1}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
