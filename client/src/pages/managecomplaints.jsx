import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminnavbar";
import {
  Search,
  Filter,
  Clock3,
  Wrench,
  CheckCircle,
} from "lucide-react";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await axios.get(
      "http://localhost:5000/api/complaints/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response:", res.data);

    setComplaints(res.data.complaints);
  } catch (error) {
    console.log(error.response);
    console.log(error.response?.data);
    alert("Failed to load complaints");
  }
};

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      console.error(error);
      alert("Failed to update complaint");
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.student?.rollNumber
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Manage Complaints
        </h1>

        {/* Search & Filter */}

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8 flex flex-col md:flex-row gap-4">

          <div className="flex items-center border rounded-xl px-4 flex-1">

            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 outline-none"
            />

          </div>

          <div className="flex items-center border rounded-xl px-4">

            <Filter className="mr-2 text-gray-500" />

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

        {filteredComplaints.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Complaints Found
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredComplaints.map((complaint) => (

              <div
                key={complaint._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-semibold">
                      {complaint.title}
                    </h2>

                    <p>
                      <strong>Student:</strong>{" "}
                      {complaint.student?.name}
                    </p>

                    <p>
                      <strong>Roll Number:</strong>{" "}
                      {complaint.student?.rollNumber}
                    </p>

                    <p>
                      <strong>Category:</strong>{" "}
                      {complaint.category}
                    </p>

                    <p>
                      <strong>Room:</strong>{" "}
                      {complaint.room}
                    </p>

                    <p>
                      <strong>Description:</strong>{" "}
                      {complaint.description}
                    </p>

                   <p className="text-gray-500 mt-2">
                      Submitted:
                     {" "}
                     {new Date(complaint.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                     month: "short",
                      year: "numeric",
                     hour: "2-digit",
                     minute: "2-digit",
                     })}
                   </p>

                  </div>

                  <div className="flex flex-col gap-4">

                    <span
                      className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>

                    <button
                      onClick={() =>
                        updateStatus(
                          complaint._id,
                          "Pending"
                        )
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Clock3 size={16} />
                      Pending
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          complaint._id,
                          "In Progress"
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Wrench size={16} />
                      In Progress
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          complaint._id,
                          "Resolved"
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Resolved
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default ManageComplaints;