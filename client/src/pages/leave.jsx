import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ArrowLeft, Plane, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Leave() {

  const rollNumber =
    localStorage.getItem("loggedInRollNumber") || "";


  const token =
    localStorage.getItem("token");


  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);



  useEffect(() => {

    fetchLeaves();

  }, []);



  const fetchLeaves = async () => {

    try {

      setFetchLoading(true);


      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/leaves/my`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );


      setLeaveHistory(
        response.data.leaves || []
      );


    } catch(error) {


      console.log(
        "Fetch Leave Error:",
        error.response?.data || error.message
      );


      if(error.response?.status === 401){

        toast.error(
          "Session expired. Please login again."
        );

      }else{

        toast.error(
          "Failed to load leave history."
        );

      }


    }finally{

      setFetchLoading(false);

    }

  };




  const handleSubmit = async () => {


    if(
      !reason ||
      !destination ||
      !departureDate ||
      !returnDate ||
      !parentContact ||
      !emergencyContact
    ){

      toast.error(
        "Please fill all the fields."
      );

      return;

    }




    if(
      !/^[0-9]{10}$/.test(parentContact) ||
      !/^[0-9]{10}$/.test(emergencyContact)
    ){

      toast.error(
        "Phone numbers must contain exactly 10 digits."
      );

      return;

    }



    if(
      new Date(returnDate) < new Date(departureDate)
    ){

      toast.error(
        "Return date cannot be before departure date."
      );

      return;

    }



    try{

      setLoading(true);



      await axios.post(

        `${import.meta.env.VITE_API_URL}/leaves`,

        {
          destination,
          reason,
          departureDate,
          returnDate,
          parentContact,
          emergencyContact,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );



      toast.success(
        "Leave request submitted successfully!"
      );



      setReason("");
      setDestination("");
      setDepartureDate("");
      setReturnDate("");
      setParentContact("");
      setEmergencyContact("");



      fetchLeaves();



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );


    }finally{

      setLoading(false);

    }


  };



  const statusColor = (status)=>{


    if(status==="Approved")
      return "bg-green-100 text-green-700";


    if(status==="Rejected")
      return "bg-red-100 text-red-700";


    return "bg-yellow-100 text-yellow-700";


  };



  return (

    <>

      <Navbar />


      <div className="ml-64 min-h-screen bg-gray-100 p-10">


        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-purple-600 mb-8"
        >

          <ArrowLeft size={20}/>

          Back to Dashboard

        </Link>



        <div className="bg-white rounded-3xl shadow-lg p-8">


          <h1 className="text-4xl font-bold text-purple-700">

            Leave Request

          </h1>


          <p className="text-gray-500 mb-6">

            Submit your hostel leave request.

          </p>


          <div className="grid md:grid-cols-2 gap-6">


            <input
              value={rollNumber}
              readOnly
              className="border rounded-xl p-4 bg-gray-200"
            />


            <input
              placeholder="Destination"
              value={destination}
              onChange={(e)=>setDestination(e.target.value)}
              className="border rounded-xl p-4"
            />


            <input
              placeholder="Reason"
              value={reason}
              onChange={(e)=>setReason(e.target.value)}
              className="border rounded-xl p-4"
            />


            <input
              type="date"
              value={departureDate}
              onChange={(e)=>setDepartureDate(e.target.value)}
              className="border rounded-xl p-4"
            />


            <input
              type="date"
              value={returnDate}
              onChange={(e)=>setReturnDate(e.target.value)}
              className="border rounded-xl p-4"
            />


            <input
              placeholder="Parent Contact"
              value={parentContact}
              onChange={(e)=>setParentContact(e.target.value)}
              className="border rounded-xl p-4"
            />


            <input
              placeholder="Emergency Contact"
              value={emergencyContact}
              onChange={(e)=>setEmergencyContact(e.target.value)}
              className="border rounded-xl p-4"
            />


          </div>
          
          <button

            onClick={handleSubmit}

            disabled={loading}

            className={`mt-8 px-8 py-4 rounded-xl text-white flex items-center gap-2 transition ${
              loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
            }`}

          >

            {loading ? (

              <>

                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />

                Submitting...

              </>


            ) : (

              <>

                <Plane size={20}/>

                Submit Leave Request

              </>


            )}


          </button>





          <h2 className="text-2xl font-bold text-purple-700 mt-12 mb-5">

            Leave History

          </h2>





          {fetchLoading ? (


            <div className="flex justify-center py-10">

              <LoaderCircle

                size={35}

                className="animate-spin text-purple-600"

              />

            </div>



          ) : leaveHistory.length === 0 ? (



            <div className="bg-gray-100 p-8 rounded-xl text-center">

              No leave requests submitted yet.

            </div>



          ) : (



            <div className="space-y-5">


              {leaveHistory.map((leave)=>(


                <div

                  key={leave._id}

                  className="bg-gray-50 border rounded-2xl p-6"

                >



                  <div className="flex justify-between">


                    <div>


                      <h3 className="text-xl font-bold">

                        {leave.destination}

                      </h3>



                      <p>

                        <strong>
                          Reason:
                        </strong>{" "}

                        {leave.reason}

                      </p>



                      <p>

                        <strong>
                          From:
                        </strong>{" "}

                        {new Date(
                          leave.departureDate
                        ).toLocaleDateString()}

                      </p>




                      <p>

                        <strong>
                          To:
                        </strong>{" "}

                        {new Date(
                          leave.returnDate
                        ).toLocaleDateString()}

                      </p>



                    </div>





                    <span

                      className={`px-4 py-2 rounded-full h-fit ${statusColor(
                        leave.status
                      )}`}

                    >

                      {leave.status}

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


export default Leave;


