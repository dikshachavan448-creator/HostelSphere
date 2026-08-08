import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Search,
  Clock3,
  Wrench,
  CheckCircle,
  Filter,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";


function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);



  const fetchComplaints = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");


      const response = await axios.get(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setComplaints(response.data.complaints || []);


    } catch (error) {

      console.log(
        "Fetch Complaints Error:",
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
          error.response?.data?.message ||
          "Failed to load complaints."
        );

      }


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchComplaints();

  }, []);




  const getStatusStyle = (status) => {

    switch(status) {

      case "Pending":

        return {
          color:"bg-yellow-100 text-yellow-700",
          icon:<Clock3 size={18}/>,
        };


      case "In Progress":

        return {
          color:"bg-blue-100 text-blue-700",
          icon:<Wrench size={18}/>,
        };


      case "Resolved":

        return {
          color:"bg-green-100 text-green-700",
          icon:<CheckCircle size={18}/>,
        };


      default:

        return {
          color:"bg-gray-100 text-gray-700",
          icon:null,
        };

    }

  };



  const filteredComplaints = complaints.filter(
    (complaint) => {

      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =
        complaint.title?.toLowerCase().includes(searchText) ||
        complaint.category?.toLowerCase().includes(searchText) ||
        complaint.room?.toLowerCase().includes(searchText) ||
        complaint.description?.toLowerCase().includes(searchText) ||
        complaint.status?.toLowerCase().includes(searchText);



      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;



      return matchesSearch && matchesStatus;

    }
  );



  return (

    <>

      {/* SIDEBAR */}
      <Navbar />


      {/* MAIN CONTENT */}
      <div className="ml-64 min-h-screen bg-gray-100 p-10">


        <div className="flex justify-between items-center mb-8">


          <h1 className="text-4xl font-bold text-purple-700">
            My Complaints
          </h1>



          <button

            onClick={fetchComplaints}

            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl transition"

          >

            <RefreshCw size={18}/>

            Refresh

          </button>


        </div>



        <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4 mb-8">


          <div className="flex items-center border rounded-xl px-4 flex-1">


            <Search className="text-gray-500"/>


            <input

              type="text"

              placeholder="Search complaints..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="w-full p-3 outline-none"

            />


          </div>



          <div className="flex items-center border rounded-xl px-4">


            <Filter className="text-gray-500 mr-2"/>


            <select

              value={statusFilter}

              onChange={(e)=>setStatusFilter(e.target.value)}

              className="outline-none p-3"

            >

              <option>All</option>

              <option>Pending</option>

              <option>In Progress</option>

              <option>Resolved</option>


            </select>


          </div>


        </div>
                {loading ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center">


            <LoaderCircle

              className="animate-spin text-purple-600 mb-4"

              size={40}

            />


            <h2 className="text-xl font-semibold text-gray-600">

              Loading complaints...

            </h2>


          </div>



        ) : filteredComplaints.length === 0 ? (


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


              const status =
                getStatusStyle(
                  complaint.status
                );



              return (

                <div

                  key={complaint._id}

                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"

                >


                  <div className="flex justify-between items-start gap-5">



                    <div>


                      <h2 className="text-2xl font-semibold text-purple-700">

                        {complaint.title}

                      </h2>




                      <p className="mt-3">

                        <strong>
                          Category:
                        </strong>{" "}

                        {complaint.category}

                      </p>




                      <p>

                        <strong>
                          Room:
                        </strong>{" "}

                        {complaint.room}

                      </p>




                      <p>

                        <strong>
                          Description:
                        </strong>{" "}

                        {complaint.description}

                      </p>




                      <p className="text-gray-500 mt-3">

                        <strong>
                          Submitted:
                        </strong>{" "}

                        {new Date(
                          complaint.createdAt
                        ).toLocaleString()}

                      </p>



                    </div>





                    <div

                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${status.color}`}

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