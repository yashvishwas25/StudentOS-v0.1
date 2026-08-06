import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl">
        <Sidebar />

        <main
          className="
            flex-1
            overflow-y-auto
            px-6
            py-6
            md:px-8
            md:py-8
            lg:px-10
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;