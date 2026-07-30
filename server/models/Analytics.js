const mongoose=require("mongoose");


const schema=new mongoose.Schema({

crowdDensity:Number,

parkingOccupied:Number,

temperature:Number,

securityAlerts:Number,

createdAt:{
type:Date,
default:Date.now
}

});


module.exports=
mongoose.model(
"Analytics",
schema
);