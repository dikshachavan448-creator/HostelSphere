import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FileWarning,
  Clock3,
  Wrench,
  CheckCircle,
  CalendarDays,
  Users,
  RefreshCw,
  LoaderCircle,
  Bell,
} from "lucide-react";


function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    fetchDashboardData();
  }, []);



  const fetchDashboardData = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("adminToken");


      const config = {
        headers:{
          Authorization:`Bearer ${token}`
        }
      };


      const [
        complaintsRes,
        leavesRes,
        studentsRes,
        noticesRes
      ] = await Promise.all([


        axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/all`,
          config
        ),


        axios.get(
          `${import.meta.env.VITE_API_URL}/leaves/all`,
          config
        ),


        axios.get(
          `${import.meta.env.VITE_API_URL}/users/students`,
          config
        ),


        axios.get(
          `${import.meta.env.VITE_API_URL}/notices`,
          config
        )

      ]);



      setComplaints(
        complaintsRes.data.complaints || []
      );


      setLeaves(
        leavesRes.data.leaves || []
      );


      setStudents(
        studentsRes.data.students || []
      );


      setNotices(
        noticesRes.data.notices || []
      );



    } catch(error){

      console.log(error);

      toast.error(
        "Failed to load dashboard"
      );


    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  };




  const handleRefresh = () => {

    setRefreshing(true);
    fetchDashboardData();

  };




  const getStatusColor=(status)=>{

    if(status==="Pending")
      return "bg-yellow-100 text-yellow-700";


    if(status==="In Progress")
      return "bg-blue-100 text-blue-700";


    if(status==="Resolved")
      return "bg-green-100 text-green-700";


    return "bg-gray-100 text-gray-700";

  };



  return (

    <div className="flex">


      {/* SIDEBAR */}
      <AdminNavbar />



      {/* MAIN CONTENT */}

      <main className="ml-64 flex-1 min-h-screen bg-gray-100 p-10">


        <div className="flex justify-between items-center mb-8">


          <h1 className="text-4xl font-bold text-purple-700">
            Admin Dashboard
          </h1>



          <button
            onClick={handleRefresh}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >

            {
              refreshing ?

              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              :

              <RefreshCw size={18}/>

            }


            Refresh

          </button>


        </div>





        {
          loading ?


          <div className="bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center">


            <LoaderCircle
              size={40}
              className="animate-spin text-purple-600 mb-4"
            />


            <p className="text-xl">
              Loading Dashboard...
            </p>


          </div>



          :



          <>



          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">


            <StatCard
              title="Total Complaints"
              value={complaints.length}
              icon={<FileWarning/>}
            />


            <StatCard
              title="Pending"
              value={
                complaints.filter(
                  c=>c.status==="Pending"
                ).length
              }
              icon={<Clock3/>}
            />


            <StatCard
              title="In Progress"
              value={
                complaints.filter(
                  c=>c.status==="In Progress"
                ).length
              }
              icon={<Wrench/>}
            />


            <StatCard
              title="Resolved"
              value={
                complaints.filter(
                  c=>c.status==="Resolved"
                ).length
              }
              icon={<CheckCircle/>}
            />


            <StatCard
              title="Students"
              value={students.length}
              icon={<Users/>}
            />


            <StatCard
              title="Leave Requests"
              value={leaves.length}
              icon={<CalendarDays/>}
            />


          </div>





          <Section title="Recent Complaints">


          {
            complaints.slice(0,5).map(item=>(


              <div
                key={item._id}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between">


                  <div>

                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>


                    <p>
                      Student: {item.student?.name || "N/A"}
                    </p>


                    <p>
                      Category: {item.category}
                    </p>


                  </div>



                  <span
                    className={`px-4 py-2 rounded-full h-fit ${getStatusColor(item.status)}`}
                  >

                    {item.status}

                  </span>


                </div>


              </div>


            ))
          }


          </Section>




          <Section title="Recent Leave Requests">

          {
            leaves.slice(0,5).map(leave=>(

              <div
                key={leave._id}
                className="border rounded-xl p-5"
              >

                <h3 className="font-semibold text-xl">
                  {leave.student?.name || "Student"}
                </h3>

                <p>
                  Destination: {leave.destination}
                </p>

                <p>
                  Status: {leave.status}
                </p>


              </div>

            ))
          }


          </Section>




          <Section title="Recent Notices">


          {
            notices.slice(0,5).map(notice=>(

              <div
                key={notice._id}
                className="border rounded-xl p-5"
              >

                <h3 className="font-semibold text-xl">
                  {notice.title}
                </h3>


                <p>
                  {notice.category}
                </p>


              </div>


            ))
          }


          </Section>


          </>

        }



      </main>


    </div>

  );

}





function StatCard({title,value,icon}){

return (

<div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">


<div>

<p className="text-gray-500">
{title}
</p>


<h2 className="text-4xl font-bold mt-2">
{value}
</h2>


</div>



<div className="bg-purple-600 text-white p-4 rounded-xl">
{icon}
</div>


</div>

);

}




function Section({title,children}){

return (

<div className="bg-white rounded-3xl shadow-lg p-8 mb-8">


<h2 className="text-3xl font-bold text-purple-700 mb-6">
{title}
</h2>


<div className="space-y-5">

{children}

</div>


</div>

);

}



export default AdminDashboard;


