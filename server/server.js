const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Routes
const noticeRoutes = require("./routes/noticeRoutes");
const authRoutes = require("./routes/authroutes");
const complaintRoutes = require("./routes/complaintroutes");
const leaveRoutes = require("./routes/leaveroutes");
const userRoutes = require("./routes/userRoutes");



const app = express();



// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));



// ===============================
// Routes
// ===============================

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/leaves", leaveRoutes);



// ===============================
// Home Route
// ===============================

app.get("/",(req,res)=>{

  res.json({

    success:true,

    message:"🚀 HostelSphere Backend API Running Successfully"

  });

});



// Health Check Route

app.get("/api/health",(req,res)=>{

  res.json({

    success:true,

    message:"HostelSphere API is healthy"

  });

});




// ===============================
// 404 Handler
// ===============================

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:"Route Not Found"

  });

});




// ===============================
// Database + Server Start
// ===============================

const PORT = process.env.PORT || 5000;



mongoose
.connect(process.env.MONGO_URI)
.then(()=>{


  console.log("✅ MongoDB Connected Successfully");


  app.listen(PORT,()=>{


    console.log(
      `🚀 Server running on port ${PORT}`
    );


  });


})
.catch((error)=>{


  console.error(
    "❌ MongoDB Connection Failed:",
    error.message
  );


});