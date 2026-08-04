import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import {
  Search,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";
import axios from "axios";


function ManageLeave() {


  const [leaveRequests, setLeaveRequests] = useState([]);
  const [search, setSearch] = useState("");



  const token = localStorage.getItem("adminToken");




  useEffect(() => {

    loadLeaves();

  }, []);





  const loadLeaves = async()=>{


    try{


      const response = await axios.get(

        "http://localhost:5000/api/leaves/all",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setLeaveRequests(
        response.data.leaves || []
      );



    }catch(error){


      console.log(
        "Error fetching leaves:",
        error.response?.data || error.message
      );


    }


  };







  const updateStatus = async(id,status)=>{


    try{


      await axios.put(

        `http://localhost:5000/api/leaves/${id}`,

        {
          status
        },

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      loadLeaves();



    }catch(error){


      console.log(
        "Error updating status:",
        error.response?.data || error.message
      );


    }


  };








  const filteredLeaves = leaveRequests.filter(
    (leave)=>

      leave.student?.rollNumber
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      leave.student?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      leave.destination
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );







  const badgeColor=(status)=>{


    switch(status){


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

<AdminNavbar />



<div className="ml-64 min-h-screen bg-gray-100 p-10">



<h1 className="text-4xl font-bold text-purple-700 mb-8">

Manage Leave Requests

</h1>





<div className="bg-white p-5 rounded-2xl shadow-lg mb-8">


<div className="flex items-center border rounded-xl px-4">


<Search className="text-gray-500"/>



<input

type="text"

placeholder="Search by Roll Number, Name or Destination..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full p-3 outline-none"

/>


</div>


</div>







{filteredLeaves.length===0 ? (


<div className="bg-white rounded-2xl shadow-lg p-10 text-center">


<CalendarDays

size={60}

className="mx-auto text-purple-600 mb-4"

/>


<h2 className="text-2xl font-bold">

No Leave Requests Found

</h2>


</div>



):(




<div className="space-y-6">


{filteredLeaves.map((leave)=>(



<div

key={leave._id}

className="bg-white rounded-2xl shadow-lg p-6"

>



<div className="flex justify-between">





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

{leave.departureDate}

</p>





<p>

<strong>Return:</strong>{" "}

{leave.returnDate}

</p>





<p>

<strong>Parent Contact:</strong>{" "}

{leave.parentContact}

</p>




</div>








<div className="flex flex-col items-end gap-3">





<span

className={`px-4 py-2 rounded-full ${badgeColor(
leave.status
)}`}

>

{leave.status}

</span>







<div className="flex flex-wrap gap-2">





<button

onClick={()=>updateStatus(
leave._id,
"Pending"
)}

className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"

>

<Clock3 size={18}/>

Pending

</button>







<button

onClick={()=>updateStatus(
leave._id,
"Approved"
)}

className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"

>

<CheckCircle size={18}/>

Approve

</button>








<button

onClick={()=>updateStatus(
leave._id,
"Rejected"
)}

className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"

>

<XCircle size={18}/>

Reject

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


export default ManageLeave;