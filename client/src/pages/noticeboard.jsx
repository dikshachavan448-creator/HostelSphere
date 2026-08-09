import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Bell, CalendarDays, Tag } from "lucide-react";
import axios from "axios";

function NoticeBoard() {

  const [notices, setNotices] = useState([]);


  useEffect(() => {

    const fetchNotices = async () => {

      try {

        const token = localStorage.getItem("token");


        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notices`,
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


    fetchNotices();

  }, []);



  return (
    <>
      <Navbar />


      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Notice Board
        </h1>



        {notices.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <Bell
              size={60}
              className="mx-auto text-purple-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              No Notices Available
            </h2>

            <p className="text-gray-500 mt-2">
              New notices from the admin will appear here.
            </p>

          </div>


        ) : (


          <div className="space-y-6">

            {notices.map((notice) => (

              <div
                key={notice._id}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600"
              >

                <div className="flex justify-between">


                  <div>

                    <h2 className="text-2xl font-bold text-purple-700">
                      {notice.title}
                    </h2>


                    <p className="mt-3 text-gray-600">
                      {notice.description}
                    </p>



                    <div className="flex gap-6 mt-4">


                      <div className="flex items-center gap-2">

                        <Tag
                          size={18}
                          className="text-purple-600"
                        />

                        <span>
                          {notice.category}
                        </span>

                      </div>




                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={18}
                          className="text-purple-600"
                        />

                        <span>
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>

                      </div>


                    </div>


                  </div>



                  {notice.priority && (

                    <span
                      className={`px-4 py-2 rounded-full h-fit ${
                        notice.priority === "Important"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {notice.priority}

                    </span>

                  )}


                </div>


              </div>

            ))}


          </div>


        )}


      </div>

    </>
  );
}


export default NoticeBoard;


