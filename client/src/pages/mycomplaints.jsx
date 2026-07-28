import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { getComplaints } from "../utils/complaintStorage";
import {
  Search,
  Clock3,
  Wrench,
  CheckCircle,
  Filter,
} from "lucide-react";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: <Clock3 size={18} />,
        };

      case "In Progress":
        return {
          color: "bg-blue-100 text-blue-700",
          icon: <Wrench size={18} />,
        };

      case "Resolved":
        return {
          color: "bg-green-100 text-green-700",
          icon: <CheckCircle size={18} />,
        };

      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: null,
        };
    }
  };

 const filteredComplaints = complaints.filter((complaint) => {
  const searchText = search.toLowerCase().trim();

  const matchesSearch =
    complaint.title?.toLowerCase().includes(searchText) ||
    complaint.category?.toLowerCase().includes(searchText) ||
    complaint.room?.toLowerCase().includes(searchText) ||
    complaint.description?.toLowerCase().includes(searchText) ||
    complaint.status?.toLowerCase().includes(searchText);

  const matchesStatus =
    statusFilter === "All" || complaint.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          My Complaints
        </h1>

        {/* Search & Filter */}

        <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4 mb-8">

          <div className="flex items-center border rounded-xl px-4 flex-1">

            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 outline-none"
            />

          </div>

          <div className="flex items-center border rounded-xl px-4">

            <Filter className="text-gray-500 mr-2" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="outline-none p-3"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

          </div>

        </div>

        {/* Complaint Cards */}

        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-700">
              No Complaints Found
            </h2>

            <p className="text-gray-500 mt-2">
              Submit your first complaint from the Create Complaint page.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {filteredComplaints.map((complaint) => {
              const status = getStatusStyle(complaint.status);

              return (
                <div
                  key={complaint.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {complaint.title}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        <strong>Category:</strong> {complaint.category}
                      </p>

                      <p className="text-gray-600">
                        <strong>Room:</strong> {complaint.room}
                      </p>

                      <p className="text-gray-600">
                        <strong>Description:</strong> {complaint.description}
                      </p>

                      <p className="text-gray-400 mt-3">
                        Submitted on {complaint.date}
                      </p>

                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.color}`}
                    >
                      {status.icon}
                      {complaint.status}
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </>
  );
}

export default MyComplaints;