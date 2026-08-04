import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import { Plus, Trash2, Pencil } from "lucide-react";
import axios from "axios";


function ManageNotices() {


  const [notices,setNotices] = useState([]);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [priority,setPriority] = useState("Normal");

  const [editingId,setEditingId] = useState(null);



  useEffect(()=>{

    loadNotices();

  },[]);



  // Fetch notices from MongoDB

  const loadNotices = async()=>{

    try{


      const token = localStorage.getItem("token");


      const response = await axios.get(

        "http://localhost:5000/api/notices",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setNotices(response.data.notices);



    }catch(error){

      console.log(error.response?.data);

    }

  };





  // Add / Update Notice

  const handleSubmit = async()=>{


    if(
      title.trim()==="" ||
      description.trim()==="" ||
      category.trim()===""
    ){

      alert("Please fill all fields");
      return;

    }



    try{


      const token = localStorage.getItem("token");



      if(editingId){


        // Update will be added after backend update route

        alert("Edit feature will be connected next");


      }
      else{


        const response = await axios.post(

          "http://localhost:5000/api/notices",

          {
            title,
            description,
            category,
            priority
          },

          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );


        console.log(response.data);



        alert("Notice Added Successfully");


      }



      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("Normal");
      setEditingId(null);


      loadNotices();



    }catch(error){


      console.log(error.response?.data);


      alert(
        error.response?.data?.message ||
        "Failed to save notice"
      );


    }


  };







  // Delete Notice

  const deleteNotice = async(id)=>{


    try{


      const token = localStorage.getItem("token");


      await axios.delete(

        `http://localhost:5000/api/notices/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      loadNotices();



    }catch(error){

      console.log(error.response?.data);

    }


  };






  const editNotice=(notice)=>{

    setEditingId(notice._id);

    setTitle(notice.title);

    setDescription(notice.description);

    setCategory(notice.category);

    setPriority(notice.priority);

  };






  return (

    <>


    <AdminNavbar />


    <div className="ml-64 min-h-screen bg-gray-100 p-10">


      <h1 className="text-4xl font-bold text-purple-700 mb-8">

        Manage Notice Board

      </h1>




      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


        <div className="grid md:grid-cols-2 gap-5">


          <input

            type="text"

            placeholder="Notice Title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            className="border rounded-xl p-4"

          />



          <select

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

            className="border rounded-xl p-4"

          >

            <option value="">
              Select Category
            </option>

            <option>
              General
            </option>

            <option>
              Emergency
            </option>

            <option>
              Holiday
            </option>

            <option>
              Event
            </option>


          </select>




          <textarea

            rows="4"

            placeholder="Notice Description"

            value={description}

            onChange={(e)=>setDescription(e.target.value)}

            className="border rounded-xl p-4 md:col-span-2"

          />




          <select

            value={priority}

            onChange={(e)=>setPriority(e.target.value)}

            className="border rounded-xl p-4"

          >

            <option>
              Normal
            </option>

            <option>
              Important
            </option>


          </select>


        </div>





        <button

          onClick={handleSubmit}

          className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-3"

        >

          <Plus size={20}/>

          {editingId ? "Update Notice":"Add Notice"}

        </button>



      </div>







      <div className="space-y-6">


      {
        notices.length===0 ? (


          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">

              No Notices Available

            </h2>


          </div>



        ):(


          notices.map((notice)=>(


            <div

              key={notice._id}

              className="bg-white rounded-2xl shadow-lg p-6"

            >



              <div className="flex justify-between">



                <div>


                  <h2 className="text-2xl font-bold">

                    {notice.title}

                  </h2>



                  <p className="mt-2">

                    {notice.description}

                  </p>



                  <p className="mt-3">

                    <strong>Category:</strong> {notice.category}

                  </p>



                  <p>

                    <strong>Date:</strong>

                    {" "}

                    {new Date(notice.createdAt).toLocaleDateString()}

                  </p>




                  <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700">

                    {notice.priority}

                  </span>


                </div>






                <div className="flex gap-3">


                  <button

                    onClick={()=>editNotice(notice)}

                    className="bg-blue-500 text-white p-3 rounded-xl"

                  >

                    <Pencil size={20}/>

                  </button>





                  <button

                    onClick={()=>deleteNotice(notice._id)}

                    className="bg-red-500 text-white p-3 rounded-xl"

                  >

                    <Trash2 size={20}/>

                  </button>



                </div>



              </div>



            </div>



          ))

        )
      }



      </div>




    </div>


    </>

  );

}


export default ManageNotices;