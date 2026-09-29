import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main
        key={pathname}
        className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}