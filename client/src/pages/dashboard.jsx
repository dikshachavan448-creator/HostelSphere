import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import StatCard from "../components/statcard";
import { getComplaints } from "../utils/complaintStorage";
import ComplaintChart from "../components/complaintchart";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Clock3,
  CheckCircle,
  CalendarDays,
  Plus,
  Bell,
  User,
  FileWarning,
  Megaphone,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/");
  }
}, [navigate]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const leaveRequests = 2;

  const notices = [
    "Hostel gate closes at 10:00 PM.",
    "Wi-Fi maintenance on Sunday.",
    "Mess menu updated for this week.",
  ];

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-8">

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-lg p-8 text-white mb-8">

          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-purple-100 mt-2 text-lg">
            Manage your hostel activities easily from one place.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Complaints"
            value={totalComplaints}
            icon={<ClipboardList size={28} />}
            color="bg-purple-600"
          />

          <StatCard
            title="Pending"
            value={pendingComplaints}
            icon={<Clock3 size={28} />}
            color="bg-yellow-500"
          />

          <StatCard
            title="Resolved"
            value={resolvedComplaints}
            icon={<CheckCircle size={28} />}
            color="bg-green-600"
          />

          <StatCard
            title="Leave Requests"
            value={leaveRequests}
            icon={<CalendarDays size={28} />}
            color="bg-blue-600"
          />

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <Link
                to="/create-complaint"
                className="bg-purple-100 hover:bg-purple-200 rounded-2xl p-6 flex flex-col items-center transition"
              >
                <Plus size={35} className="text-purple-700" />
                <p className="mt-3 font-semibold">
                  Complaint
                </p>
              </Link>

              <Link
                to="/leave"
                className="bg-blue-100 hover:bg-blue-200 rounded-2xl p-6 flex flex-col items-center transition"
              >
                <CalendarDays size={35} className="text-blue-700" />
                <p className="mt-3 font-semibold">
                  Leave
                </p>
              </Link>

              <Link
                to="/profile"
                className="bg-green-100 hover:bg-green-200 rounded-2xl p-6 flex flex-col items-center transition"
              >
                <User size={35} className="text-green-700" />
                <p className="mt-3 font-semibold">
                  Profile
                </p>
              </Link>

              <Link
                to="/noticeboard"
                className="bg-orange-100 hover:bg-orange-200 rounded-2xl p-6 flex flex-col items-center transition"
              >
                <Bell size={35} className="text-orange-700" />
                <p className="mt-3 font-semibold">
                  Notices
                </p>
              </Link>

            </div>

          </div>

          {/* Recent Complaints */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">

              <FileWarning className="text-purple-600" />

              <h2 className="text-2xl font-bold">
                Recent Complaints
              </h2>

            </div>

            <div className="space-y-4">

              {complaints.length === 0 ? (
                <p className="text-gray-500">
                  No complaints submitted yet.
                </p>
              ) : (
                complaints
                  .slice(-3)
                  .reverse()
                  .map((complaint) => (
                    <div
                      key={complaint.id}
                      className="border rounded-xl p-4 hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-lg">
                        {complaint.title}
                      </h3>

                      <p className="text-gray-500">
                        Room {complaint.room}
                      </p>

                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                          complaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : complaint.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                  ))
              )}

            </div>

          </div>

          {/* Latest Notices */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">

              <Megaphone className="text-purple-600" />

              <h2 className="text-2xl font-bold">
                Latest Notices
              </h2>

            </div>

            <div className="space-y-4">

              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-600 bg-purple-50 rounded-xl p-4"
                >
                  {notice}
                </div>
              ))}

            </div>

          </div>

        </div>
       <div className="mt-8">
  <ComplaintChart
    total={totalComplaints}
    pending={pendingComplaints}
    resolved={resolvedComplaints}
  />
</div>
      </div>
    </>
  );
}

export default Dashboard;