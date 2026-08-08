import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Pencil,
  Save,
} from "lucide-react";

function Profile() {
  const rollNumber =
    localStorage.getItem("loggedInRollNumber") || "";

  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
    room: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      `profile_${rollNumber}`
    );

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [rollNumber]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      profile.name.trim() === "" ||
      profile.email.trim() === "" ||
      profile.phone.trim() === "" ||
      profile.hostel.trim() === "" ||
      profile.room.trim() === ""
    ) {
      setMessage("Please fill all the fields.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(profile.email)) {
      setMessage("Please enter a valid email.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(profile.phone)) {
      setMessage("Phone number must contain exactly 10 digits.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    localStorage.setItem(
      `profile_${rollNumber}`,
      JSON.stringify(profile)
    );

    setMessage("Profile updated successfully!");
    setMessageType("success");

    setTimeout(() => {
      setMessage("");
    }, 3000);

    setEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-gray-100 p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          My Profile
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-5xl">

          <div className="flex items-center gap-6 mb-10">

            <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center">
              <User
                size={60}
                className="text-purple-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {profile.name || "Student"}
              </h2>

              <p className="text-gray-500">
                HostelSphere Student
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <GraduationCap className="text-purple-600" />

                <h3 className="font-semibold">
                  Roll Number
                </h3>

              </div>

              <input
                type="text"
                value={rollNumber}
                readOnly
                className="w-full border rounded-xl p-3 bg-gray-200"
              />

            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <User className="text-purple-600" />

                <h3 className="font-semibold">
                  Full Name
                </h3>

              </div>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter Full Name"
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <Mail className="text-purple-600" />

                <h3 className="font-semibold">
                  Email
                </h3>

              </div>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter Email"
                className="w-full border rounded-xl p-3"
              />

            </div>
                        {/* Phone Number */}

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <Phone className="text-purple-600" />

                <h3 className="font-semibold">
                  Phone Number
                </h3>

              </div>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter Phone Number"
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Hostel Block */}

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <Building2 className="text-purple-600" />

                <h3 className="font-semibold">
                  Hostel Block
                </h3>

              </div>

              <input
                type="text"
                name="hostel"
                value={profile.hostel}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter Hostel Block"
                className="w-full border rounded-xl p-3"
              />

            </div>

            {/* Room Number */}

            <div className="bg-gray-50 p-5 rounded-2xl">

              <div className="flex items-center gap-2 mb-3">

                <Building2 className="text-purple-600" />

                <h3 className="font-semibold">
                  Room Number
                </h3>

              </div>

              <input
                type="text"
                name="room"
                value={profile.room}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter Room Number"
                className="w-full border rounded-xl p-3"
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Pencil size={20} />
                Edit Profile
              </button>

            ) : (

              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Save size={20} />
                Save Changes
              </button>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;
