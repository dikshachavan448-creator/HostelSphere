import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = () => {
    if (rollNumber.trim() === "" || password.trim() === "") {
      setMessage("Please enter Roll Number and Password.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    // Save login session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInRollNumber", rollNumber);

    setMessage("Login Successful!");
    setMessageType("success");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
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

        {/* Roll Number */}

        <label className="font-medium">Roll Number</label>

        <div className="flex items-center border rounded-xl mt-2 mb-5 px-4">

          <User className="text-gray-500" size={20} />

          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-4 outline-none"
          />

        </div>

        {/* Password */}

        <label className="font-medium">Password</label>

        <div className="flex items-center border rounded-xl mt-2 mb-8 px-4">

          <Lock className="text-gray-500" size={20} />

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
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold transition"
        >
          <LogIn size={22} />
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;