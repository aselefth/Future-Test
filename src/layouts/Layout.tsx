import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Layout () {
    return (
        <div className="w-full px-5 md:px-10 xl:px-40 py-2 min-h-[100vh] flex flex-col items-center mt-16 relative mb-40">
            <Navigation />
            <Outlet />
        </div>
    )
}