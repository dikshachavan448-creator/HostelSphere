import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  LoaderCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      
      if (response.data.user.role !== "admin") {
        toast.error("Access denied. Admin account required.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.user)
      );

      toast.success("Admin Login Successful!");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
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

        {/* Email */}

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

        {/* Password */}

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

        {/* Login Button */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold transition ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white`}
        >
          {loading ? (
            <>
              <LoaderCircle
                size={22}
                className="animate-spin"
              />
              Logging In...
            </>
          ) : (
            <>
              <ShieldCheck size={22} />
              Login
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;

