const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    name:{
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
    },
    phone:{
        type: String,
        required: [true, "Please Enter Your Phone"],
    },
}, 
{
    timestamps:true,
})

module.exports = mongoose.model("Contacts", contactSchema)