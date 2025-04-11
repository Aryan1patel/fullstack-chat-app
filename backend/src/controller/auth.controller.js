import { genrateToken } from "../lib/util.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req,res) =>{

    const{fullName,email,password}=req.body

    try {
        if(password.length<3){
            return res.status(400).json({message:"password must be at least 3 characters long"})
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({message:"user already exists"})
        }

        const salt = await bcrypt.genSalt(10)                  // hashing the password
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // genrate jwt token
            genrateToken(newUser._id,res)  // genrate token and set in cookie
            await newUser.save()    // save in database

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
                token:genrateToken(newUser._id,res),
                // password:newUser.password
            })
        }
        else{
            return res.status(400).json({message:"something went wrong"})
        
        }


    } catch (error) {

        console.log("error in signup : ",error)
        res.status(500).json({message:"internal server error"})
        
    }

}
export const login = async (req,res) =>{

    const{email,password}=req.body
    
    try {

        const user= await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }

        genrateToken(user._id,res)  // genrate token and set in cookie

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            token:genrateToken(user._id,res),
            // password:user.password    
        })
        

    } catch (error) {

        console.log("error in login : ",error)
        res.status(500).json({message:"internal server error"})
        
    }

}
export const logout =(req,res) =>{
    
    try {

        res.clearCookie("jwt","",{maxAge:0})
    
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("error in logout : ",error)
        res.status(500).json({message:"internal server error "})
        
    }

}


export const updateProfile = async (req,res) =>{

    try {
        
    

    const { profilePic } = req.body;
    const userId = req.user._id  // get user from the protectRoute middleware

   if(!profilePic){
       return res.status(400).json({message:"profile pic is required"})
   }

  


   const uploadResponse = await cloudinary.uploader.upload(profilePic);
   console.log("Cloudinary Upload Response: ", uploadResponse);

   const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})  // new true will return the updated document
   res.status(200).json(updatedUser)
   

} catch (error) {
    console.log("error in updateProfile : ",error)
    res.status(500).json({message:"internal server error"})
        
}

}

export const checkAuth = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Log req.user for debugging (optional)
        console.log("req.user : ", req.user);

        // Send the authenticated user as response
        return res.status(200).json({ user: req.user });

    } catch (error) {
        // Log error for debugging
        console.error("Error in checkAuth: ", error.message);

        // Send internal server error response
        return res.status(500).json({ message: "Internal server error" });
    }
};