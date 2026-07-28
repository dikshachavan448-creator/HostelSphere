import { useState } from "react";
import Navbar from "../components/navbar";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { saveComplaint } from "../utils/complaintStorage";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = () => {
    if (
      title.trim() === "" ||
      category.trim() === "" ||
      room.trim() === "" ||
      description.trim() === ""
    ) {
      setMessage("Please fill all the fields.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    saveComplaint({
      title,
      category,
      room,
      description,
    });

    setMessage("Complaint submitted successfully!");
    setMessageType("success");

    setTitle("");
    setCategory("");
    setRoom("");
    setDescription("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl">

          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Create Complaint
          </h1>

          <p className="text-gray-500 mb-6">
            Report hostel issues quickly and easily.
          </p>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl font-medium ${
                messageType === "success"
                  ? "bg-green-100 border border-green-300 text-green-700"
                  : "bg-red-100 border border-red-300 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="space-y-6">

            {/* Complaint Title */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Complaint Title
              </label>

              <input
                type="text"
                placeholder="Enter complaint title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Category</option>
                <option>Electricity</option>
                <option>Water</option>
                <option>Plumbing</option>
                <option>Internet</option>
                <option>Cleaning</option>
                <option>Food Quality</option>
                <option>Security</option>
                <option>Room Maintenance</option>
                <option>Other</option>
              </select>
            </div>

            {/* Room Number */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Room Number
              </label>

              <input
                type="text"
                placeholder="Enter room number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Description
              </label>

              <textarea
                rows="6"
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Upload Image
              </label>

              <input
                type="file"
                className="w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
            >
              <Send size={20} />
              Submit Complaint
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default CreateComplaint;