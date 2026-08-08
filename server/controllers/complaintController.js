const Complaint = require("../models/Complaint");


// ==============================
// Create Complaint (Student)
// ==============================

const createComplaint = async (req, res) => {
  try {

    const {
      title,
      category,
      room,
      description,
    } = req.body;


    const complaint = await Complaint.create({

      title,
      category,
      room,
      description,

      // Logged in user ID from JWT
      student: req.user.id,

      status: "Pending",

    });



    res.status(201).json({

      success: true,

      message: "Complaint created successfully",

      complaint,

    });



  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};




// ==============================
// Get Student Complaints
// ==============================

const getComplaints = async (req, res) => {

  try {


    const complaints = await Complaint.find({

      student: req.user.id,

    })
    .sort({ createdAt: -1 });



    res.status(200).json({

      success: true,

      count: complaints.length,

      complaints,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ==============================
// Admin - Get All Complaints
// ==============================

const getAllComplaints = async (req, res) => {

  try {


    const complaints = await Complaint.find()

      .populate(
        "student",
        "name rollNumber email"
      )

      .sort({
        createdAt: -1
      });



    res.status(200).json({

      success: true,

      count: complaints.length,

      complaints,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ==============================
// Admin - Update Complaint Status
// ==============================

const updateComplaintStatus = async (req, res) => {

  try {


    const {
      status
    } = req.body;



    const complaint = await Complaint.findByIdAndUpdate(

      req.params.id,

      {
        status,
      },

      {
        new: true,
      }

    );



    if (!complaint) {

      return res.status(404).json({

        success: false,

        message: "Complaint not found",

      });

    }




    res.status(200).json({

      success: true,

      message: "Complaint status updated",

      complaint,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





module.exports = {

  createComplaint,

  getComplaints,

  getAllComplaints,

  updateComplaintStatus,

};