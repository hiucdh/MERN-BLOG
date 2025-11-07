import AdminSideBar from "./AdminSideBar.jsx";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSideBar />
            <main className="flex-1 ml-64 p-6 overflow-y-auto text-white">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
