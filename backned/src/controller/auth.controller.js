import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing username
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Login user
export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"All field is necessary."
            });
        }

        const user =await User.findOne({email});
        console.log("User",user);
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        console.log("password matched",checkPassword);
        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        return res.status(200).json({
            success:true,
                    user:{
                id:user._id,
                username:user.username,
                email:user.email,
            },
            message:"Login successfull",
            token
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const getProfile =async (req,res)=>{
    try{
        const id = req.user.id;
       const user = await User.findById(id).select("-password"); // password nahi laaayega ye 
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User did not exist"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
    