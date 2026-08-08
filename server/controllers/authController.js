const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      rollNumber,
      phone,
    } = req.body;



    const existingUser = await User.findOne({
      email
    });


    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists",

      });

    }



    const salt = await bcrypt.genSalt(10);


    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );



    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role,

      rollNumber,

      phone,

    });





    res.status(201).json({

      success: true,

      message: "User registered successfully",


      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        rollNumber: user.rollNumber,

        phone: user.phone,

      },

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }

};


const loginUser = async (req, res) => {


  try {


    const {
      rollNumber,
      email,
      password
    } = req.body;



    console.log("Login Request:", req.body);



    let user;


    if (rollNumber) {


      user = await User.findOne({

        rollNumber,

      });


    }

    else if (email) {


      user = await User.findOne({

        email,

      });


    }





    if (!user) {


      return res.status(404).json({

        success:false,

        message:"User not found",

      });


    }


    const isMatch = await bcrypt.compare(

      password,

      user.password

    );

    if (!isMatch) {


      return res.status(401).json({

        success:false,

        message:"Invalid Password",

      });


    }

    const token = jwt.sign(

      {

        id:user._id,

        role:user.role,

      },

      process.env.JWT_SECRET,

      {

        expiresIn:"7d",

      }

    );

    res.status(200).json({

      success:true,

      message:"Login successful",


      token,



      user:{

        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role,

        rollNumber:user.rollNumber,

        phone:user.phone,

      },


    });

  } catch(error) {


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};

module.exports = {

  registerUser,

  loginUser,

};