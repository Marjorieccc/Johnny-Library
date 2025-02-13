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
      <main className="tracking-wider">
        <Header />
          <div className="mx-auto mt-20 max-w-screen-2xl lg:py-10"> 
            <Outlet />
          </div>
        <Footer />
      </main>
    </QueryClientProvider>
  );
}
