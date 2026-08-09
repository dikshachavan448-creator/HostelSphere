import { useState } from "react";
import Navbar from "../components/navbar";
import { ArrowLeft, Send, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !category.trim() ||
      !room.trim() ||
      !description.trim()
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints`,
        {
          title,
          category,
          room,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint submitted successfully!");

      setTitle("");
      setCategory("");
      setRoom("");
      setDescription("");

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <div className="mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>


        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl">

          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Create Complaint
          </h1>

          <p className="text-gray-500 mb-8">
            Report hostel issues quickly and easily.
          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Complaint Title
              </label>

              <input
                type="text"
                placeholder="Enter complaint title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
                autoFocus
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
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
                disabled={loading}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option value="">
                  Select Category
                </option>

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


            {/* Room */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Room Number
              </label>

              <input
                type="text"
                placeholder="Enter room number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                disabled={loading}
                required
                maxLength={10}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
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
                disabled={loading}
                required
                className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />

            </div>


            {/* Upload Image */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                disabled={loading}
                className="w-full border border-gray-300 rounded-xl p-3 disabled:bg-gray-100"
              />

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
              }`}
            >

              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />

                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />

                  Submit Complaint
                </>
              )}

            </button>


          </form>

        </div>

      </div>

    </>
  );
}

export default CreateComplaint;


