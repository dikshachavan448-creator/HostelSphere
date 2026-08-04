import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ArrowLeft, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


function Leave() {


  const rollNumber =
    localStorage.getItem("loggedInRollNumber") || "";


  const token = localStorage.getItem("token");


  const [reason,setReason] = useState("");
  const [destination,setDestination] = useState("");
  const [departureDate,setDepartureDate] = useState("");
  const [returnDate,setReturnDate] = useState("");
  const [parentContact,setParentContact] = useState("");
  const [emergencyContact,setEmergencyContact] = useState("");


  const [leaveHistory,setLeaveHistory] = useState([]);


  const [message,setMessage] = useState("");
  const [messageType,setMessageType] = useState("");





  useEffect(()=>{

    fetchLeaves();

  },[]);







  const fetchLeaves = async()=>{


    try{


      const response = await axios.get(

        "http://localhost:5000/api/leaves/my",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      console.log(
        "Student Leaves:",
        response.data
      );



      setLeaveHistory(

        response.data.leaves || []

      );



    }catch(error){


      console.log(

        "Fetch Leave Error:",
        error.response?.data || error.message

      );


    }


  };







  const handleSubmit = async()=>{


    if(
      !reason ||
      !destination ||
      !departureDate ||
      !returnDate ||
      !parentContact ||
      !emergencyContact
    ){

      setMessage("Please fill all the fields.");
      setMessageType("error");

      return;

    }




    if(
      !/^[0-9]{10}$/.test(parentContact) ||
      !/^[0-9]{10}$/.test(emergencyContact)
    ){

      setMessage(
        "Phone numbers must contain exactly 10 digits."
      );

      setMessageType("error");

      return;

    }






    if(
      new Date(returnDate) < new Date(departureDate)
    ){

      setMessage(
        "Return date cannot be before departure date."
      );

      setMessageType("error");

      return;

    }







    try{


      await axios.post(

        "http://localhost:5000/api/leaves",

        {

          destination,
          reason,
          departureDate,
          returnDate,
          parentContact,
          emergencyContact

        },


        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setMessage(
        "Leave request submitted successfully!"
      );

      setMessageType("success");



      setReason("");
      setDestination("");
      setDepartureDate("");
      setReturnDate("");
      setParentContact("");
      setEmergencyContact("");



      fetchLeaves();



    }catch(error){


      setMessage(

        error.response?.data?.message ||
        "Something went wrong"

      );

      setMessageType("error");


    }


  };








  const statusColor=(status)=>{


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





{message && (

<div
className={`p-4 rounded-xl mb-6 ${
messageType==="success"
?
"bg-green-100 text-green-700"
:
"bg-red-100 text-red-700"
}`}
>

{message}

</div>

)}







<div className="grid md:grid-cols-2 gap-6">



<div>

<label>Roll Number</label>

<input

value={rollNumber}

readOnly

className="w-full border rounded-xl p-4 bg-gray-200"

 />

</div>





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

className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-xl flex gap-2"

>

<Plane size={20}/>

Submit Leave Request

</button>









<h2 className="text-2xl font-bold text-purple-700 mt-12 mb-5">

Leave History

</h2>






{

leaveHistory.length===0 ?


(

<div className="bg-gray-100 p-8 rounded-xl text-center">

No leave requests submitted yet.

</div>


)


:


(

<div className="space-y-5">


{

leaveHistory.map((leave)=>(


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
<strong>Reason:</strong> {leave.reason}
</p>


<p>
<strong>From:</strong> {leave.departureDate}
</p>


<p>
<strong>To:</strong> {leave.returnDate}
</p>


</div>





<span

className={`px-4 py-2 rounded-full h-fit ${statusColor(leave.status)}`}

>

{leave.status}

</span>




</div>


</div>


))


}


</div>


)


}



</div>


</div>


</>

);


}


export default Leave;