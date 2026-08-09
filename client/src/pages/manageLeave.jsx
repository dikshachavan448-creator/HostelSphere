import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Search,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock3,
  LoaderCircle,
} from "lucide-react";


function ManageLeave() {

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const token = localStorage.getItem("adminToken");


  useEffect(() => {
    loadLeaves();
  }, []);



  const loadLeaves = async () => {

    try {

      setLoading(true);


      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/leaves/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setLeaveRequests(response.data.leaves || []);


    } catch (error) {

      console.log(
        "Load Leave Error:",
        error.response?.data || error.message
      );


      if (error.response?.status === 401) {

        toast.error(
          "Session expired. Please login again."
        );

      } else if (error.message === "Network Error") {

        toast.error(
          "Unable to connect to server."
        );

      } else {

        toast.error(
          "Failed to load leave requests."
        );

      }


    } finally {

      setLoading(false);

    }

  };



  const updateStatus = async (id, status) => {

    try {

      setUpdatingId(id);


      await axios.put(

        `${import.meta.env.VITE_API_URL}/leaves/${id}`,

        {
          status,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      toast.success(
        `Leave marked as ${status}`
      );


      loadLeaves();


    } catch (error) {

      console.log(
        "Update Leave Error:",
        error.response?.data || error.message
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to update status."
      );


    } finally {

      setUpdatingId("");

    }

  };



  const filteredLeaves = leaveRequests.filter((leave) => {

    const text = search.toLowerCase();


    return (

      leave.student?.rollNumber
        ?.toLowerCase()
        .includes(text) ||

      leave.student?.name
        ?.toLowerCase()
        .includes(text) ||

      leave.destination
        ?.toLowerCase()
        .includes(text)

    );

  });



  const badgeColor = (status) => {

    switch(status) {

      case "Approved":
        return "bg-green-100 text-green-700";


      case "Rejected":
        return "bg-red-100 text-red-700";


      default:
        return "bg-yellow-100 text-yellow-700";

    }

  };



  return (

    <>

      {/* FIXED SIDEBAR */}
      <AdminNavbar />


      {/* PAGE CONTENT */}
      <div className="ml-64 min-h-screen bg-gray-100 p-10">


        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Manage Leave Requests
        </h1>


        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">

          <div className="flex items-center border rounded-xl px-4">

            <Search className="text-gray-500 mr-2" />


            <input

              type="text"

              placeholder="Search by Roll Number, Name or Destination..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="w-full p-3 outline-none"

            />


          </div>


        </div>



        {loading ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center flex flex-col items-center">

            <LoaderCircle
              size={40}
              className="animate-spin text-purple-600 mb-3"
            />


            <h2 className="text-xl font-semibold text-gray-600">
              Loading leave requests...
            </h2>


          </div>


        ) : filteredLeaves.length === 0 ? (


          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">


            <CalendarDays
              size={60}
              className="mx-auto text-purple-600 mb-4"
            />


            <h2 className="text-2xl font-bold">
              No Leave Requests Found
            </h2>


          </div>


        ) : (

          <div className="space-y-6">
          {filteredLeaves.map((leave) => (

            <div
              key={leave._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >


              <div className="flex justify-between items-start">


                <div>


                  <h2 className="text-2xl font-semibold">
                    {leave.destination}
                  </h2>



                  <p>
                    <strong>Name:</strong>{" "}
                    {leave.student?.name || "N/A"}
                  </p>



                  <p>
                    <strong>Roll Number:</strong>{" "}
                    {leave.student?.rollNumber || "N/A"}
                  </p>



                  <p>
                    <strong>Reason:</strong>{" "}
                    {leave.reason}
                  </p>



                  <p>
                    <strong>Departure:</strong>{" "}
                    {new Date(
                      leave.departureDate
                    ).toLocaleDateString("en-IN")}
                  </p>



                  <p>
                    <strong>Return:</strong>{" "}
                    {new Date(
                      leave.returnDate
                    ).toLocaleDateString("en-IN")}
                  </p>



                  <p>
                    <strong>Parent Contact:</strong>{" "}
                    {leave.parentContact}
                  </p>



                  <p>
                    <strong>Emergency Contact:</strong>{" "}
                    {leave.emergencyContact}
                  </p>



                  <p className="text-gray-500 mt-3">

                    Submitted:{" "}

                    {new Date(
                      leave.createdAt
                    ).toLocaleString("en-IN", {

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
                    className={`px-4 py-2 rounded-full text-center font-medium ${badgeColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>





                  <button

                    disabled={
                      updatingId === leave._id
                    }

                    onClick={() =>
                      updateStatus(
                        leave._id,
                        "Pending"
                      )
                    }

                    className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                  >

                    <Clock3 size={16} />

                    Pending

                  </button>







                  <button

                    disabled={
                      updatingId === leave._id
                    }

                    onClick={() =>
                      updateStatus(
                        leave._id,
                        "Approved"
                      )
                    }

                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                  >


                    {updatingId === leave._id ? (

                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />

                    ) : (

                      <CheckCircle size={16} />

                    )}



                    Approve


                  </button>







                  <button

                    disabled={
                      updatingId === leave._id
                    }

                    onClick={() =>
                      updateStatus(
                        leave._id,
                        "Rejected"
                      )
                    }

                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                  >

                    <XCircle size={16} />

                    Reject


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


export default ManageLeave;


