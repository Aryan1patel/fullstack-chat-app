import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    profilePic:{
        type: String,
        default:""
    }
},{timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;