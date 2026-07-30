const Analytics = require("../models/Analytics");


exports.getAnalytics = async(req,res)=>{

    try{

        const data =
        await Analytics
        .find()
        .sort({
            createdAt:-1
        })
        .limit(20);


        res.json({

            success:true,

            data:data.reverse()

        });


    }
    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};