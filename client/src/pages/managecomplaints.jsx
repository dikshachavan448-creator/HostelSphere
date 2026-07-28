import { useEffect, useState } from "react";
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
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(stored);
  };

  const updateStatus = (id, newStatus) => {
    const updated = complaints.map((item) =>
      item.id === id
        ? { ...item, status: newStatus }
        : item
    );

    setComplaints(updated);
    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.rollNumber
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

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8 flex flex-col md:flex-row gap-4">

          <div className="flex items-center border rounded-xl px-4 flex-1">

            <Search className="text-gray-500" />

            <input
              type="text"
              placeholder="Search by title, category or roll number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full p-3 outline-none"
            />

          </div>

          <div className="flex items-center border rounded-xl px-4">

            <Filter className="mr-2 text-gray-500" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
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

            <h2 className="text-2xl font-bold text-gray-700">
              No Complaints Found
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredComplaints.map((complaint) => (

              <div
                key={complaint.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-semibold">
                      {complaint.title}
                    </h2>

                    <p className="mt-2">
                      <strong>Category:</strong>{" "}
                      {complaint.category}
                    </p>

                    <p>
                      <strong>Roll Number:</strong>{" "}
                      {complaint.rollNumber}
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
                      Submitted: {complaint.date}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3 items-end">

                    <span
                      className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>

                    {/* PASTE PART 2 BELOW THIS LINE */}
                                        <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            "Pending"
                          )
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Clock3 size={16} />
                        Pending
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            "In Progress"
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Wrench size={16} />
                        In Progress
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            "Resolved"
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Resolved
                      </button>

                    </div>

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