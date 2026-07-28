import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileWarning,
  User,
  LogOut,
  CalendarDays,
  Bell,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInRollNumber");

    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-purple-700">
          HostelSphere
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col p-4 gap-3 flex-1">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/create-complaint"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <FileWarning size={22} />
          Create Complaint
        </Link>

        <Link
          to="/my-complaints"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <FileWarning size={22} />
          My Complaints
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <User size={22} />
          Profile
        </Link>

        <Link
          to="/leave"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <CalendarDays size={22} />
          Leave Request
        </Link>

        <Link
          to="/noticeboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-100 hover:text-purple-700 transition"
        >
          <Bell size={22} />
          Notice Board
        </Link>

      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;