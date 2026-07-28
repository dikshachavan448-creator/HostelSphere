import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import { Plus, Trash2, Pencil } from "lucide-react";

function ManageNotices() {
  const [notices, setNotices] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = () => {
    const data =
      JSON.parse(localStorage.getItem("notices")) || [];

    setNotices(data);
  };

  const handleSubmit = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      category.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    let updated = [...notices];

    if (editingId) {
      updated = updated.map((notice) =>
        notice.id === editingId
          ? {
              ...notice,
              title,
              description,
              category,
              priority,
            }
          : notice
      );
    } else {
      updated.unshift({
        id: Date.now(),
        title,
        description,
        category,
        priority,
        date: new Date().toLocaleDateString(),
      });
    }

    localStorage.setItem(
      "notices",
      JSON.stringify(updated)
    );

    setNotices(updated);

    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("Normal");
    setEditingId(null);
  };

  const deleteNotice = (id) => {
    const updated = notices.filter(
      (notice) => notice.id !== id
    );

    localStorage.setItem(
      "notices",
      JSON.stringify(updated)
    );

    setNotices(updated);
  };

  const editNotice = (notice) => {
    setEditingId(notice.id);
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
              <option value="">Select Category</option>
              <option>General</option>
              <option>Emergency</option>
              <option>Holiday</option>
              <option>Event</option>
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
              <option>Normal</option>
              <option>Important</option>
            </select>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:bg-purple-700"
          >
            <Plus size={20}/>
            {editingId ? "Update Notice" : "Add Notice"}
          </button>

        </div>

        <div className="space-y-6">

          {notices.length===0 ? (

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Notices Available
              </h2>

            </div>

          ) : (

            notices.map((notice)=>(

              <div
                key={notice.id}
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
                      <strong>Date:</strong> {notice.date}
                    </p>

                    <span className={`inline-block mt-3 px-4 py-2 rounded-full ${
                      notice.priority==="Important"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                    }`}>
                      {notice.priority}
                    </span>

                  </div>

                  {/* PASTE PART 2 BELOW */}
                                    <div className="flex gap-3 items-start">

                    <button
                      onClick={() => editNotice(notice)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                    >
                      <Pencil size={20} />
                    </button>


                    <button
                      onClick={() => deleteNotice(notice.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </>
  );
}

export default ManageNotices;