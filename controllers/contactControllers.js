const asyncHandler = require('express-async-handler')
const Contact = require("../models/contactModel")

/*  @desc get all contact
    @route GET /api/contacts
    @access private
*/
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.params.id })
    res.status(200).json(contact)
})

/*  @desc Create New Contact
    @route POST /api/contacts
    @access private
*/
const createContact = asyncHandler(async (req, res) =>{
    console.log("this is the request is from:", req.body)

    const { name, email, phone } = req.body;

    if(!name || !email, !phone){
        res.status(400)
        throw new Error("All Fields are mandatory")
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id })
    res.status(200).json(contact)
})

/*  @desc Get a Specific Contact
    @route GET /api/contacts/:id
    @access private
*/
const getAContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found!")
    }
    res.status(200).json(contact)
})

/* 
    @desc Update a Specific Contact
    @route PUT /api/contacts/:id
    @access private
*/
const updateContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found!")
    }

    if(!contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update users contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, 
    {
        new:true
    })
    res.status(201).json(updatedContact)
})

/* 
    @desc Delete a Specific Contact
    @route DELETE /api/contacts/:id
    @access private
*/

const deleteContact = async (req, res) =>{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found!")
    }
    res.status(200).json({msg: `Delete Contact for ${req.params.id}`})
}

module.exports = {
    getContact, createContact, getAContact, updateContact, deleteContact
}