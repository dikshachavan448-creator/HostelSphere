import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileWarning,
  CalendarDays,
  Bell,
  LogOut,
} from "lucide-react";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col">

      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-purple-700">
          HostelSphere
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Admin Panel
        </p>
      </div>

      <div className="flex-1 p-4 space-y-3">

        <Link
          to="/admin-dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/manage-complaints"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
        >
          <FileWarning size={22} />
          Complaints
        </Link>

        <Link
          to="/manage-leaves"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
        >
          <CalendarDays size={22} />
          Leave Requests
        </Link>

        <Link
          to="/manage-notices"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
        >
          <Bell size={22} />
          Notice Board
        </Link>
        <Link
  to="/manage-leave"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
>
  <CalendarDays size={22} />
  Leave Requests
</Link>
<Link
  to="/manage-notices"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 transition"
>
  <Bell size={22} />
  Manage Notices
</Link>

      </div>

      <div className="p-4 border-t">

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl p-3 flex justify-center items-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminNavbar;