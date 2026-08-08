const Leave = require("../models/leave");


const createLeave = async (req, res) => {

  try {


    const leave = await Leave.create({

      ...req.body,

      student: req.user.id,

      status:"Pending"

    });



    res.status(201).json({

      success:true,

      message:"Leave request submitted successfully",

      leave

    });



  } catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};


const getMyLeaves = async(req,res)=>{

  try{


    const leaves = await Leave.find({

      student:req.user.id

    })
    .sort({
      createdAt:-1
    });



    res.json({

      success:true,

      leaves

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};


const getAllLeaves = async(req,res)=>{

  try{


    const leaves = await Leave.find()

      .populate(
        "student",
        "name rollNumber email"
      )

      .sort({
        createdAt:-1
      });



    res.json({

      success:true,

      leaves

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};


const updateLeaveStatus = async(req,res)=>{

  try{


    const leave = await Leave.findByIdAndUpdate(

      req.params.id,

      {
        status:req.body.status
      },

      {
        new:true
      }

    );



    res.json({

      success:true,

      leave

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};






module.exports={

  createLeave,

  getMyLeaves,

  getAllLeaves,

  updateLeaveStatus

};