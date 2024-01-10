const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Your UserName"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email Already Exists"],
    },
    password: {
        type: String,
        required: [true, "PLease Enter Your Password"],
    },
}, 
{
    timestamps: true,
}
) 

module.exports = mongoose.model("Users", userSchema)