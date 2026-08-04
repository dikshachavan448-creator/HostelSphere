import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import axios from "axios";

import {
  FileWarning,
  Clock3,
  Wrench,
  CheckCircle,
  CalendarDays,
  Users,
} from "lucide-react";


function AdminDashboard() {


  const [complaints, setComplaints] = useState([]);
  const [leaveCount, setLeaveCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const totalComplaints = complaints.length;


  const pendingComplaints = complaints.filter(
    (complaint)=>complaint.status==="Pending"
  ).length;



  const inProgressComplaints = complaints.filter(
    (complaint)=>complaint.status==="In Progress"
  ).length;



  const resolvedComplaints = complaints.filter(
    (complaint)=>complaint.status==="Resolved"
  ).length;



  useEffect(()=>{

    fetchComplaints();
    fetchLeaveCount();
    fetchStudents();

  },[]);






  const fetchComplaints = async()=>{


    try{

      const token = localStorage.getItem("adminToken");


      const response = await axios.get(

        "http://localhost:5000/api/complaints/all",

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
        error.response?.data || error.message
      );


      setError("Failed to load complaints");


    }finally{

      setLoading(false);

    }

  };







  const fetchLeaveCount = async()=>{


    try{


      const token = localStorage.getItem("adminToken");


      const response = await axios.get(

        "http://localhost:5000/api/leaves/all",

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
        "Leave count error:",
        error.response?.data || error.message
      );

    }


  };







  const fetchStudents = async()=>{


    try{


      const token = localStorage.getItem("adminToken");


      const response = await axios.get(

        "http://localhost:5000/api/users/students",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );


      setStudentCount(

        response.data.students?.length || 0

      );



    }catch(error){


      console.log(

        "Student count error:",

        error.response?.data || error.message

      );


    }


  };








return (

<>

<AdminNavbar />


<div className="ml-64 min-h-screen bg-gray-100 p-10">


<h1 className="text-4xl font-bold text-purple-700 mb-8">

Admin Dashboard

</h1>




{loading && (

<div className="bg-white p-8 rounded-2xl shadow">

Loading dashboard...

</div>

)}





{error && (

<div className="bg-red-100 text-red-700 p-5 rounded-xl">

{error}

</div>

)}






{!loading && !error && (

<>


<div className="grid md:grid-cols-3 gap-6">



<StatCard
title="Total Complaints"
value={totalComplaints}
icon={<FileWarning size={42}/>}
/>



<StatCard
title="Pending"
value={pendingComplaints}
icon={<Clock3 size={42}/>}
/>



<StatCard
title="In Progress"
value={inProgressComplaints}
icon={<Wrench size={42}/>}
/>



<StatCard
title="Resolved"
value={resolvedComplaints}
icon={<CheckCircle size={42}/>}
/>



<StatCard
title="Students"
value={studentCount}
icon={<Users size={42}/>}
/>



<StatCard
title="Leave Requests"
value={leaveCount}
icon={<CalendarDays size={42}/>}
/>



</div>






<div className="bg-white rounded-2xl shadow-lg mt-10 p-6">


<h2 className="text-2xl font-bold text-purple-700 mb-6">

Recent Complaints

</h2>




{
complaints.length===0 ? (

<p className="text-gray-500">

No complaints available.

</p>


):(


<div className="space-y-4">


{

complaints.slice(0,5).map((item)=>(


<div

key={item._id}

className="border rounded-xl p-4"

>


<div className="flex justify-between">


<div>


<h3 className="font-semibold text-lg">

{item.title}

</h3>


<p className="text-gray-600">

Category: {item.category}

</p>


<p className="text-gray-500">

Room: {item.room}

</p>


<p className="text-gray-500">

Student: {item.student?.name || "Unknown"}

</p>


<p className="text-gray-500">

Roll No: {item.student?.rollNumber || "N/A"}

</p>



</div>



<span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">

{item.status}

</span>



</div>


</div>


))


}



</div>


)

}



</div>



</>

)}



</div>


</>

);


}







function StatCard({title,value,icon}){


return (

<div className="bg-white rounded-2xl shadow-lg p-6">


<div className="flex justify-between items-center">


<div>

<p className="text-gray-500">

{title}

</p>


<h2 className="text-4xl font-bold mt-2">

{value}

</h2>


</div>


{icon}


</div>


</div>

);


}



export default AdminDashboard;