import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminNavbar from "../components/adminnavbar";

import {
  Search,
  Filter,
  Clock3,
  Wrench,
  CheckCircle,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/complaints/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data.complaints || []);

    } catch (error) {
      console.log(
        "Fetch Complaints Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load complaints"
      );

    } finally {
      setLoading(false);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

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


      toast.success(
        `Status changed to ${status}`
      );


      fetchComplaints();


    } catch (error) {

      console.log(
        "Update Status Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );

    } finally {

      setUpdatingId("");

    }
  };


  const filteredComplaints = complaints.filter((complaint) => {

    const searchText = search.toLowerCase();


    const matchesSearch =
      complaint.title
        ?.toLowerCase()
        .includes(searchText) ||

      complaint.category
        ?.toLowerCase()
        .includes(searchText) ||

      complaint.student?.name
        ?.toLowerCase()
        .includes(searchText) ||

      complaint.student?.rollNumber
        ?.toLowerCase()
        .includes(searchText);


    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;


    return matchesSearch && matchesStatus;

  });



  const getStatusColor = (status) => {

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";


    if (status === "In Progress")
      return "bg-blue-100 text-blue-700";


    if (status === "Resolved")
      return "bg-green-100 text-green-700";


    return "bg-gray-100 text-gray-700";

  };



  return (
    <>

      <AdminNavbar />


      <div className="ml-64 min-h-screen bg-gray-100 p-10">


        <div className="flex justify-between items-center mb-8">


          <h1 className="text-4xl font-bold text-purple-700">
            Manage Complaints
          </h1>


          <button
            onClick={fetchComplaints}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >

            <RefreshCw size={18}/>

            Refresh

          </button>


        </div>



        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8 flex gap-4">


          <div className="flex items-center border rounded-xl px-4 flex-1">


            <Search size={20} className="text-gray-500"/>


            <input
              type="text"
              placeholder="Search by title, student or roll number..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="w-full p-3 outline-none"
            />


          </div>



          <div className="flex items-center border rounded-xl px-4">


            <Filter size={20} className="text-gray-500 mr-2"/>


            <select
              value={statusFilter}
              onChange={(e)=>setStatusFilter(e.target.value)}
              className="p-3 outline-none"
            >

              <option value="All">
                All
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>


            </select>


          </div>


        </div>




        {
          loading ? (

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">

              <LoaderCircle
                size={40}
                className="animate-spin text-purple-600"
              />

              <p className="mt-3 font-semibold">
                Loading complaints...
              </p>

            </div>


          ) : filteredComplaints.length === 0 ? (


            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Complaints Found
              </h2>

            </div>


          ) : (


            <div className="space-y-6">


              {
                filteredComplaints.map((complaint)=>(


                  <div
                    key={complaint._id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                  >


                    <div className="flex justify-between gap-6">


                      <div className="flex-1">


                        <h2 className="text-2xl font-bold text-purple-700">
                          {complaint.title}
                        </h2>


                        <p>
                          <b>Student:</b>{" "}
                          {complaint.student?.name || "N/A"}
                        </p>


                        <p>
                          <b>Roll Number:</b>{" "}
                          {complaint.student?.rollNumber || "N/A"}
                        </p>


                        <p>
                          <b>Category:</b>{" "}
                          {complaint.category}
                        </p>


                        <p>
                          <b>Room:</b>{" "}
                          {complaint.room}
                        </p>


                        <p>
                          <b>Description:</b>{" "}
                          {complaint.description}
                        </p>


                        <p className="text-gray-500 mt-3">

                          Submitted:{" "}
                          {
                            new Date(
                              complaint.createdAt
                            ).toLocaleString("en-IN")
                          }

                        </p>


                      </div>




                      <div className="flex flex-col gap-3">


                        <span
                          className={`px-4 py-2 rounded-full text-center font-semibold ${getStatusColor(
                            complaint.status
                          )}`}
                        >

                          {complaint.status}

                        </span>



                        <button
                          disabled={updatingId===complaint._id}
                          onClick={()=>
                            updateStatus(
                              complaint._id,
                              "Pending"
                            )
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                        >

                          <Clock3 size={16}/>

                          Pending

                        </button>



                        <button
                          disabled={updatingId===complaint._id}
                          onClick={()=>
                            updateStatus(
                              complaint._id,
                              "In Progress"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                        >

                          <Wrench size={16}/>

                          In Progress

                        </button>




                        <button
                          disabled={updatingId===complaint._id}
                          onClick={()=>
                            updateStatus(
                              complaint._id,
                              "Resolved"
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                        >

                          {
                            updatingId===complaint._id ?

                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />

                            :

                            <CheckCircle size={16}/>

                          }


                          Resolved

                        </button>


                      </div>


                    </div>


                  </div>


                ))
              }


            </div>


          )
        }


      </div>

    </>
  );
}


export default ManageComplaints;