const Notice = require("../models/notice");

const createNotice = async(req,res)=>{

    try{

        
const notice = await Notice.create({

    title:req.body.title,

    description:req.body.description,

    category:req.body.category,

    priority:req.body.priority,

    createdBy:req.user.id

});

        res.status(201).json({

            success:true,
            notice

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getNotices = async(req,res)=>{


    try{


        const notices = await Notice
        .find()
        .sort({
            createdAt:-1
        });



        res.json({

            success:true,
            notices

        });



    }catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }


};


const deleteNotice = async (req, res) => {

    try {

        const notice = await Notice.findById(req.params.id);


        if (!notice) {

            return res.status(404).json({

                success:false,
                message:"Notice not found"

            });

        }


        await Notice.findByIdAndDelete(req.params.id);


        res.json({

            success:true,
            message:"Notice deleted successfully"

        });


    } catch(error) {

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

module.exports = {

    createNotice,
    getNotices,
    deleteNotice

};