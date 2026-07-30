const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Validation
        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });

        }


        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "User already exists"

            });

        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });


        return res.status(201).json({

            success: true,

            message: "Registration successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });


    }

    catch (err) {

        console.log("REGISTER ERROR:", err);


        return res.status(500).json({

            success:false,

            message:"Registration failed"

        });

    }

};



exports.login = async(req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;


        const user = await User.findOne({
            email
        });


        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }


        const match = await bcrypt.compare(
            password,
            user.password
        );


        if(!match){

            return res.status(400).json({

                success:false,

                message:"Invalid password"

            });

        }


        const token = jwt.sign(

            {
                id:user._id,
                role:user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );


        res.json({

            success:true,

            token,

            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }

        });


    }
    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:"Login failed"

        });

    }

};
