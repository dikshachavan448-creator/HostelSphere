import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Search,
  Users,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";


function ManageStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchStudents();
  }, []);



  const fetchStudents = async () => {

    try {

      setLoading(true);


      const token =
        localStorage.getItem("adminToken");


      const response = await axios.get(
        "${import.meta.env.VITE_API_URL}/users/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setStudents(
        response.data.students || []
      );


    } catch (error) {

      console.log(
        "Fetch Students Error:",
        error.response?.data || error.message
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to load students"
      );


    } finally {

      setLoading(false);

    }

  };




  const filteredStudents = students.filter(
    (student) => {

      const searchText =
        search.toLowerCase();


      return (

        student.name
          ?.toLowerCase()
          .includes(searchText) ||


        student.rollNumber
          ?.toLowerCase()
          .includes(searchText) ||


        student.email
          ?.toLowerCase()
          .includes(searchText) ||


        student.phone
          ?.toLowerCase()
          .includes(searchText)

      );

    }
  );




  return (

    <>

      <AdminNavbar />


      <div className="ml-64 min-h-screen bg-gray-100 p-10">



        <div className="flex justify-between items-center mb-8">


          <h1 className="text-4xl font-bold text-purple-700">
            Manage Students
          </h1>



          <div className="flex gap-3">


            <button
              onClick={fetchStudents}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow"
            >

              <RefreshCw size={18}/>

              Refresh

            </button>



            <div className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl shadow">

              <Users size={22}/>

              <span className="font-semibold">
                {students.length} Students
              </span>

            </div>


          </div>


        </div>





        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


          <div className="flex items-center gap-3 border rounded-xl px-4">


            <Search
              size={22}
              className="text-gray-500"
            />



            <input

              type="text"

              placeholder="Search by Name, Roll Number, Email or Phone..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              className="w-full p-3 outline-none"

            />


          </div>


        </div>







        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">



          {
            loading ? (


              <div className="p-10 flex flex-col items-center justify-center">


                <LoaderCircle

                  size={40}

                  className="animate-spin text-purple-600 mb-3"

                />


                <p className="text-lg font-semibold">

                  Loading students...

                </p>


              </div>



            ) : filteredStudents.length === 0 ? (



              <div className="p-10 text-center">


                <h2 className="text-2xl font-bold">

                  No Students Found

                </h2>


              </div>



            ) : (



              <div className="overflow-x-auto">


                <table className="w-full">


                  <thead className="bg-purple-100">


                    <tr>


                      <th className="p-4 text-left">
                        #
                      </th>


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
                      filteredStudents.map(
                        (student,index)=>(


                          <tr

                            key={student._id}

                            className="border-b hover:bg-purple-50 transition"

                          >


                            <td className="p-4 font-medium">
                              {index+1}
                            </td>


                            <td className="p-4 font-medium">
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


                        )
                      )
                    }


                  </tbody>


                </table>


              </div>


            )
          }



        </div>




      </div>


    </>

  );

}


export default ManageStudents;
