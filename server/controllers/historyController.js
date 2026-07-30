const ChatHistory = require("../models/ChatHistory");

exports.getHistory = async (req,res)=>{

    try{

        const history = await ChatHistory

        .find()

        .sort({

            createdAt:-1

        });

        res.json({

            success:true,

            data:history

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};