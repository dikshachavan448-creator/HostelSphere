import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { ArrowLeft, Plane } from "lucide-react";
import { Link } from "react-router-dom";

function Leave() {
  const rollNumber =
    localStorage.getItem("loggedInRollNumber") || "";

  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const savedLeaves =
      JSON.parse(
        localStorage.getItem(`leave_${rollNumber}`)
      ) || [];

    setLeaveHistory(savedLeaves);
  }, [rollNumber]);

  const handleSubmit = () => {
    if (
      reason.trim() === "" ||
      destination.trim() === "" ||
      departureDate === "" ||
      returnDate === "" ||
      parentContact.trim() === "" ||
      emergencyContact.trim() === ""
    ) {
      setMessage("Please fill all the fields.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    if (
      !/^[0-9]{10}$/.test(parentContact) ||
      !/^[0-9]{10}$/.test(emergencyContact)
    ) {
      setMessage("Phone numbers must contain exactly 10 digits.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    if (new Date(returnDate) < new Date(departureDate)) {
      setMessage("Return date cannot be before departure date.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    const newLeave = {
      id: Date.now(),
      rollNumber,
      destination,
      reason,
      departureDate,
      returnDate,
      parentContact,
      emergencyContact,
      status: "Pending",
      appliedOn: new Date().toLocaleDateString(),
    };

    const updatedLeaves = [...leaveHistory, newLeave];

    localStorage.setItem(
      `leave_${rollNumber}`,
      JSON.stringify(updatedLeaves)
    );

    setLeaveHistory(updatedLeaves);

    setMessage("Leave request submitted successfully!");
    setMessageType("success");

    setReason("");
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
    setParentContact("");
    setEmergencyContact("");

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

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Leave Request
          </h1>

          <p className="text-gray-500 mb-6">
            Submit your hostel leave request.
          </p>

          {message && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-medium">
                Roll Number
              </label>

              <input
                type="text"
                value={rollNumber}
                readOnly
                className="w-full border rounded-xl p-4 bg-gray-200 mt-2"
              />
            </div>
                        <div>
              <label className="font-medium">
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Reason
              </label>

              <input
                type="text"
                placeholder="Reason for leave"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Departure Date
              </label>

              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Return Date
              </label>

              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Parent Contact
              </label>

              <input
                type="text"
                placeholder="Enter parent's phone number"
                value={parentContact}
                onChange={(e) => setParentContact(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">
                Emergency Contact
              </label>

              <input
                type="text"
                placeholder="Emergency contact number"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition"
          >
            <Plane size={20} />
            Submit Leave Request
          </button>

          {/* Leave History */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Leave History
            </h2>

            {leaveHistory.length === 0 ? (

              <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
                No leave requests submitted yet.
              </div>

            ) : (

              <div className="space-y-5">

                {leaveHistory.map((leave) => (

                  <div
                    key={leave.id}
                    className="bg-gray-50 rounded-2xl p-6 border"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {leave.destination}
                        </h3>

                        <p className="text-gray-600 mt-2">
                          <strong>Reason:</strong> {leave.reason}
                        </p>

                        <p className="text-gray-600">
                          <strong>Departure:</strong> {leave.departureDate}
                        </p>

                        <p className="text-gray-600">
                          <strong>Return:</strong> {leave.returnDate}
                        </p>

                        <p className="text-gray-400 mt-2">
                          Applied on {leave.appliedOn}
                        </p>

                      </div>

                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
                        {leave.status}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default Leave;