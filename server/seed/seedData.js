const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("../models/user");
const Complaint = require("../models/complaint");
const Leave = require("../models/leave");
const Notice = require("../models/notice");

const seedData = async () => {
  try {
    await connectDB();

    console.log("================================");
    console.log("Starting safe demo data seeding...");
    console.log("Existing data will NOT be deleted.");
    console.log("================================");

    // ==========================================
    // CREATE ADMIN ONLY IF NOT EXISTS
    // ==========================================

    const adminPassword = await bcrypt.hash(
      "admin123",
      10
    );

    let admin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (!admin) {
      admin = await User.create({
        name: "Hostel Admin",
        email: "admin@gmail.com",
        password: adminPassword,
        role: "admin",
        phone: "9999999999",
      });

      console.log("Admin created: admin@gmail.com");
    } else {
      console.log("Admin already exists.");
    }

    // ==========================================
    // CREATE STUDENTS ONLY IF NOT EXISTS
    // ==========================================

    const studentPassword = await bcrypt.hash(
      "123456",
      10
    );

    const studentData = [
      {
        name: "Aarav Sharma",
        email: "aarav@gmail.com",
        password: studentPassword,
        role: "student",
        rollNumber: "ENTC001",
        phone: "9876543210",
      },

      {
        name: "Priya Patil",
        email: "priya@gmail.com",
        password: studentPassword,
        role: "student",
        rollNumber: "ENTC002",
        phone: "9876543211",
      },

      {
        name: "Rohan Deshmukh",
        email: "rohan@gmail.com",
        password: studentPassword,
        role: "student",
        rollNumber: "ENTC003",
        phone: "9876543212",
      },

      {
        name: "Sneha Kulkarni",
        email: "sneha@gmail.com",
        password: studentPassword,
        role: "student",
        rollNumber: "ENTC004",
        phone: "9876543213",
      },

      {
        name: "Aditya Joshi",
        email: "aditya@gmail.com",
        password: studentPassword,
        role: "student",
        rollNumber: "ENTC005",
        phone: "9876543214",
      },
    ];

    const students = [];

    for (const data of studentData) {
      let student = await User.findOne({
        email: data.email,
      });

      if (!student) {
        student = await User.create(data);

        console.log(
          `Student created: ${data.name}`
        );
      } else {
        console.log(
          `Student already exists: ${data.name}`
        );
      }

      students.push(student);
    }

    // ==========================================
    // CREATE DEMO COMPLAINTS
    // ONLY IF THEY DON'T EXIST
    // ==========================================

    const complaintData = [
      {
        title: "Water Leakage in Bathroom",
        category: "Maintenance",
        room: "A-203",
        description:
          "Water is leaking continuously from bathroom pipe.",
        student: students[0]._id,
        status: "Pending",
      },

      {
        title: "WiFi Connectivity Issue",
        category: "Internet",
        room: "B-105",
        description:
          "Internet connection is unstable.",
        student: students[1]._id,
        status: "In Progress",
      },

      {
        title: "Fan Not Working",
        category: "Electrical",
        room: "C-301",
        description:
          "Ceiling fan stopped working.",
        student: students[2]._id,
        status: "Resolved",
      },

      {
        title: "Room Cleaning Required",
        category: "Cleanliness",
        room: "A-104",
        description:
          "Room cleaning service is pending.",
        student: students[3]._id,
        status: "Pending",
      },
    ];

    for (const complaintDataItem of complaintData) {
      const existingComplaint =
        await Complaint.findOne({
          title: complaintDataItem.title,
          student: complaintDataItem.student,
        });

      if (!existingComplaint) {
        await Complaint.create(
          complaintDataItem
        );

        console.log(
          `Complaint created: ${complaintDataItem.title}`
        );
      } else {
        console.log(
          `Complaint already exists: ${complaintDataItem.title}`
        );
      }
    }

    // ==========================================
    // CREATE DEMO LEAVES
    // ONLY IF THEY DON'T EXIST
    // ==========================================

    const leaveData = [
      {
        student: students[0]._id,
        destination: "Nashik",
        reason: "Family Function",
        departureDate: "2026-08-15",
        returnDate: "2026-08-18",
        parentContact: "9876543210",
        emergencyContact: "9876543210",
        status: "Pending",
      },

      {
        student: students[1]._id,
        destination: "Pune",
        reason: "Medical Appointment",
        departureDate: "2026-08-20",
        returnDate: "2026-08-22",
        parentContact: "9876543211",
        emergencyContact: "9876543211",
        status: "Approved",
      },

      {
        student: students[2]._id,
        destination: "Mumbai",
        reason: "Personal Work",
        departureDate: "2026-09-01",
        returnDate: "2026-09-03",
        parentContact: "9876543212",
        emergencyContact: "9876543212",
        status: "Rejected",
      },
    ];

    for (const leaveDataItem of leaveData) {
      const existingLeave =
        await Leave.findOne({
          student: leaveDataItem.student,
          destination: leaveDataItem.destination,
          reason: leaveDataItem.reason,
          departureDate:
            leaveDataItem.departureDate,
        });

      if (!existingLeave) {
        await Leave.create(
          leaveDataItem
        );

        console.log(
          `Leave created: ${leaveDataItem.destination}`
        );
      } else {
        console.log(
          `Leave already exists: ${leaveDataItem.destination}`
        );
      }
    }

    // ==========================================
    // CREATE DEMO NOTICES
    // ONLY IF THEY DON'T EXIST
    // ==========================================

    const noticeData = [
      {
        title: "Hostel Maintenance Schedule",

        description:
          "Water supply will be unavailable from 10 AM to 2 PM on Sunday.",

        category: "Maintenance",

        priority: "High",

        createdBy: admin._id,
      },

      {
        title: "Independence Day Celebration",

        description:
          "All students are invited for hostel celebration on 15 August.",

        category: "Event",

        priority: "Normal",

        createdBy: admin._id,
      },

      {
        title: "Mess Timing Update",

        description:
          "Dinner timing has been changed from 7 PM to 9 PM.",

        category: "Mess",

        priority: "Normal",

        createdBy: admin._id,
      },
    ];

    for (const noticeDataItem of noticeData) {
      const existingNotice =
        await Notice.findOne({
          title: noticeDataItem.title,
        });

      if (!existingNotice) {
        await Notice.create(
          noticeDataItem
        );

        console.log(
          `Notice created: ${noticeDataItem.title}`
        );
      } else {
        console.log(
          `Notice already exists: ${noticeDataItem.title}`
        );
      }
    }

    // ==========================================
    // FINISHED
    // ==========================================

    console.log("");
    console.log("================================");
    console.log("Demo Data Seeding Completed ✅");
    console.log("================================");

    console.log("");
    console.log("Admin Login:");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");

    console.log("");
    console.log("Demo Student Login:");
    console.log("Password: 123456");

    console.log("");
    console.log(
      "Existing manually registered users were preserved ✅"
    );

    console.log(
      "Existing complaints, leaves and notices were preserved ✅"
    );

    console.log("================================");

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {
    console.log("Seed Error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedData();