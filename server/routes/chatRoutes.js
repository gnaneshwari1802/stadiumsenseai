const express=require("express");

const router=express.Router();


const {
getChatHistory
}=require("../controllers/aiController");



router.get(
"/history",
getChatHistory
);


module.exports=router;