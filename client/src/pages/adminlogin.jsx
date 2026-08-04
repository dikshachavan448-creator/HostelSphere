import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setMessage("Please enter email and password.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Check admin role
      if (response.data.user.role !== "admin") {
        setMessage("Access denied. Admin account required.");
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
        }, 3000);

        return;
      }

      // Save admin token
      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      // Save admin details
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.user)
      );

      setMessage("Login Successful!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 800);

    } catch (error) {
      console.log(error.response?.data);

      setMessage(
        error.response?.data?.message || "Login failed"
      );

      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="flex justify-center mb-5">
          <div className="bg-purple-100 p-5 rounded-full">
            <ShieldCheck
              size={55}
              className="text-purple-700"
            />
          </div>
        </div>


        <h1 className="text-4xl font-bold text-center text-purple-700">
          Admin Login
        </h1>


        <p className="text-center text-gray-500 mt-2 mb-8">
          HostelSphere Administration
        </p>


        {message && (
          <div
            className={`mb-6 p-3 rounded-xl text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}


        <label className="font-medium">
          Admin Email
        </label>

        <div className="flex items-center border rounded-xl mt-2 mb-5 px-4">

          <Mail
            className="text-gray-500"
            size={20}
          />

          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 outline-none"
          />

        </div>


        <label className="font-medium">
          Password
        </label>


        <div className="flex items-center border rounded-xl mt-2 mb-8 px-4">

          <Lock
            className="text-gray-500"
            size={20}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 outline-none"
          />

        </div>


        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Login
        </button>


      </div>

    </div>
  );
}

export default AdminLogin;