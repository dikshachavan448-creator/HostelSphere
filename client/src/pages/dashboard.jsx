import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import StatCard from "../components/statcard";
import ComplaintChart from "../components/complaintchart";

import {
  ClipboardList,
  Clock3,
  CheckCircle,
  CalendarDays,
  Plus,
  Bell,
  User,
  FileWarning,
  Megaphone,
  LoaderCircle,
} from "lucide-react";


function Dashboard() {


  const navigate = useNavigate();


  const [complaints, setComplaints] = useState([]);
const [leaveCount, setLeaveCount] = useState(0);
const [notices, setNotices] = useState([]);
const [loading, setLoading] = useState(true);





  useEffect(()=>{


    const token = localStorage.getItem("token");


    if(!token){

      navigate("/");

    }


  },[navigate]);







  useEffect(()=>{


    fetchComplaints();

    fetchLeaveCount();
    
    fetchNotices();

  },[]);







  const fetchComplaints = async()=>{


    try{


      const token = localStorage.getItem("token");



      const response = await axios.get(

        "http://localhost:5000/api/complaints",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setComplaints(
        response.data.complaints || []
      );



    }catch(error){


      console.log(
        "Error fetching complaints:",
        error.response?.data || error.message
      );


    }finally{


      setLoading(false);


    }


  };









  const fetchLeaveCount = async()=>{
 

    try{


      const token = localStorage.getItem("token");



      const response = await axios.get(

        "http://localhost:5000/api/leaves/my",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setLeaveCount(

        response.data.leaves?.length || 0

      );



    }catch(error){


      console.log(
        "Error fetching leaves:",
        error.response?.data || error.message
      );


    }


  };

  const fetchNotices = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/notices",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotices(response.data.notices || []);

  } catch (error) {

    console.log(
      "Error fetching notices:",
      error.response?.data || error.message
    );

  }

};





  const totalComplaints = complaints.length;



  const pendingComplaints = complaints.filter(

    (complaint)=>

      complaint.status==="Pending"

  ).length;





  const progressComplaints = complaints.filter(

    (complaint)=>

      complaint.status==="In Progress"

  ).length;





  const resolvedComplaints = complaints.filter(

    (complaint)=>

      complaint.status==="Resolved"

  ).length;







  





return (

<>


<Navbar />



<div className="ml-64 min-h-screen bg-gray-100 p-8">



<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-lg p-8 text-white mb-8">


<h1 className="text-4xl font-bold">

Welcome Back 👋

</h1>


<p className="text-purple-100 mt-2 text-lg">

Manage your hostel activities easily from one place.

</p>


</div>








<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">


<StatCard

title="Total Complaints"

value={totalComplaints}

icon={<ClipboardList size={28}/>}

color="bg-purple-600"

/>



<StatCard

title="Pending"

value={pendingComplaints}

icon={<Clock3 size={28}/>}

color="bg-yellow-500"

/>



<StatCard

title="In Progress"

value={progressComplaints}

icon={<LoaderCircle size={28}/>}

color="bg-blue-600"

/>



<StatCard

title="Resolved"

value={resolvedComplaints}

icon={<CheckCircle size={28}/>}

color="bg-green-600"

/>



<StatCard

title="Leave Requests"

value={leaveCount}

icon={<CalendarDays size={28}/>}

color="bg-indigo-600"

/>



</div>







<div className="grid lg:grid-cols-3 gap-8">





<div className="bg-white rounded-3xl shadow-lg p-6">


<h2 className="text-2xl font-bold mb-6">

Quick Actions

</h2>



<div className="grid grid-cols-2 gap-4">



<Link
to="/create-complaint"
className="bg-purple-100 rounded-2xl p-6 flex flex-col items-center"
>

<Plus size={35}/>

<p className="mt-3 font-semibold">
Complaint
</p>

</Link>





<Link
to="/leave"
className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center"
>

<CalendarDays size={35}/>

<p className="mt-3 font-semibold">
Leave
</p>

</Link>





<Link
to="/profile"
className="bg-green-100 rounded-2xl p-6 flex flex-col items-center"
>

<User size={35}/>

<p className="mt-3 font-semibold">
Profile
</p>

</Link>





<Link
to="/noticeboard"
className="bg-orange-100 rounded-2xl p-6 flex flex-col items-center"
>

<Bell size={35}/>

<p className="mt-3 font-semibold">
Notices
</p>

</Link>




</div>


</div>








<div className="bg-white rounded-3xl shadow-lg p-6">


<div className="flex items-center gap-2 mb-6">


<FileWarning/>

<h2 className="text-2xl font-bold">

Recent Complaints

</h2>


</div>





{loading ? (

<p>Loading...</p>


):

complaints.length===0 ? (

<p className="text-gray-500">

No complaints submitted yet.

</p>


):


complaints.slice(-3).reverse().map((complaint)=>(


<div
key={complaint._id}
className="border rounded-xl p-4 mb-4"
>


<h3 className="font-semibold">

{complaint.title}

</h3>


<p>

Room {complaint.room}

</p>


<span>

{complaint.status}

</span>


</div>


))


}



</div>







<div className="bg-white rounded-3xl shadow-lg p-6">


<div className="flex gap-2 mb-6">

<Megaphone/>

<h2 className="text-2xl font-bold">

Latest Notices

</h2>

</div>



{notices.length === 0 ? (

  <p className="text-gray-500">
    No notices available.
  </p>

) : (

  notices.slice(0, 3).map((notice) => (

    <div
      key={notice._id}
      className="border-l-4 border-purple-600 bg-purple-50 p-4 mb-4 rounded-lg"
    >

      <div className="flex justify-between items-center">

        <h3 className="font-bold text-purple-700">
          {notice.title}
        </h3>

        <span className="text-xs text-gray-500">
          {new Date(notice.createdAt).toLocaleDateString("en-IN")}
        </span>

      </div>

      <p className="mt-2 text-gray-700">
        {notice.description}
      </p>

    </div>

  ))

)}



</div>



</div>








<div className="mt-8">


<ComplaintChart

total={totalComplaints}

pending={pendingComplaints}

resolved={resolvedComplaints}

/>


</div>



</div>


</>

);


}


export default Dashboard;