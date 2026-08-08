const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    departureDate: {
      type: String,
      required: true,
    },

    returnDate: {
      type: String,
      required: true,
    },

    parentContact: {
      type: String,
      required: true,
    },
emergencyContact: {
  type: String,
  required: true,
},
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Leave", leaveSchema);