const User = require("../models/user");


const getStudents = async (req,res)=>{

    try{

        const students = await User.find({
            role:"student"
        }).select("-password");


        res.json({
            success:true,
            students
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    getStudents
};