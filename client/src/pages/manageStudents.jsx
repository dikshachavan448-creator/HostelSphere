import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import axios from "axios";
import { Search } from "lucide-react";


function ManageStudents() {


  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchStudents();

  }, []);




  const fetchStudents = async () => {


    try {


      const token = localStorage.getItem("adminToken") 
        || localStorage.getItem("token");



      const response = await axios.get(

        "http://localhost:5000/api/users/students",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );



      setStudents(response.data.students);



    } catch(error) {


      console.log(
        error.response?.data
      );


    } finally {

      setLoading(false);

    }

  };





  const filteredStudents = students.filter((student)=>{


    const name =
      student.name?.toLowerCase() || "";


    const roll =
      student.rollNumber?.toLowerCase() || "";



    const searchText =
      search.toLowerCase();



    return (
      name.includes(searchText) ||
      roll.includes(searchText)
    );


  });






  return (

    <>


    <AdminNavbar />



    <div className="ml-64 min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold text-purple-700 mb-8">

        Manage Students

      </h1>





      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


        <div className="flex items-center gap-3 border rounded-xl px-4">


          <Search size={22}/>


          <input

            type="text"

            placeholder="Search by name or roll number..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="w-full p-3 outline-none"

          />


        </div>


      </div>







      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">


        {
          loading ? (

            <div className="p-10 text-center text-xl">

              Loading students...

            </div>


          ) : filteredStudents.length === 0 ? (


            <div className="p-10 text-center text-xl">

              No students found

            </div>


          ) : (


            <table className="w-full">


              <thead className="bg-purple-100">


                <tr>


                  <th className="p-4 text-left">
                    Name
                  </th>


                  <th className="p-4 text-left">
                    Roll Number
                  </th>


                  <th className="p-4 text-left">
                    Email
                  </th>


                  <th className="p-4 text-left">
                    Phone
                  </th>


                  


                </tr>


              </thead>





              <tbody>


              {
                filteredStudents.map((student)=>(


                  <tr
                    key={student._id}
                    className="border-b"
                  >


                    <td className="p-4">
                      {student.name}
                    </td>


                    <td className="p-4">
                      {student.rollNumber || "N/A"}
                    </td>


                    <td className="p-4">
                      {student.email}
                    </td>


                    <td className="p-4">
                      {student.phone || "N/A"}
                    </td>


                    


                  </tr>


                ))
              }


              </tbody>


            </table>


          )
        }


      </div>



    </div>


    </>

  );

}


export default ManageStudents;