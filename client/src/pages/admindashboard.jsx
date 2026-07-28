import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import {
  FileWarning,
  Clock3,
  Wrench,
  CheckCircle,
  CalendarDays,
  Users,
} from "lucide-react";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const allComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(allComplaints);

    let leaves = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("leave_")) {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        leaves = [...leaves, ...data];
      }
    });

    setLeaveRequests(leaves);

    const students = new Set();

    allComplaints.forEach((item) => {
      if (item.rollNumber) {
        students.add(item.rollNumber);
      }
    });

    leaves.forEach((item) => {
      if (item.rollNumber) {
        students.add(item.rollNumber);
      }
    });

    setStudentCount(students.size);
  }, []);

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Admin Dashboard
        </h1>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Complaints</p>
                <h2 className="text-4xl font-bold mt-2">
                  {complaints.length}
                </h2>
              </div>

              <FileWarning
                size={42}
                className="text-purple-600"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Pending</p>
                <h2 className="text-4xl font-bold mt-2">
                  {pending}
                </h2>
              </div>

              <Clock3
                size={42}
                className="text-yellow-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">In Progress</p>
                <h2 className="text-4xl font-bold mt-2">
                  {progress}
                </h2>
              </div>

              <Wrench
                size={42}
                className="text-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Resolved</p>
                <h2 className="text-4xl font-bold mt-2">
                  {resolved}
                </h2>
              </div>

              <CheckCircle
                size={42}
                className="text-green-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Leave Requests</p>
                <h2 className="text-4xl font-bold mt-2">
                  {leaveRequests.length}
                </h2>
              </div>

              <CalendarDays
                size={42}
                className="text-indigo-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Students</p>
                <h2 className="text-4xl font-bold mt-2">
                  {studentCount}
                </h2>
              </div>

              <Users
                size={42}
                className="text-pink-500"
              />
            </div>
          </div>

        </div>

        {/* Recent Complaints */}

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">

          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Recent Complaints
          </h2>

          {complaints.length === 0 ? (

            <p className="text-gray-500">
              No complaints available.
            </p>

          ) : (

            <div className="space-y-4">

              {complaints
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item) => (

                  <div
                    key={item.id}
                    className="border rounded-xl p-4"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="font-semibold text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-600">
                          {item.category}
                        </p>

                        <p className="text-gray-500 text-sm">
                          Roll No: {item.rollNumber}
                        </p>

                      </div>

                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                        {item.status}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default AdminDashboard;