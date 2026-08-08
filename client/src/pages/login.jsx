import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, LoaderCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (rollNumber.trim() === "" || password.trim() === "") {
      toast.error("Please enter Roll Number and Password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/auth/login",
        {
          rollNumber,
          password,
        }
      );

      // Store JWT Token
      localStorage.setItem("token", response.data.token);

      // Store User Data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Store Login Status
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "loggedInRollNumber",
        response.data.user.rollNumber
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Invalid login credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-4xl font-bold text-center text-purple-700">
          HostelSphere
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Student Login
        </p>

        {/* Roll Number */}

        <label className="font-medium">
          Roll Number
        </label>

        <div className="flex items-center border rounded-xl mt-2 mb-5 px-4">

          <User
            className="text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
              <LogIn size={22} />
              Login
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default Login;
