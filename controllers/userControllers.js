const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/*  @desc Register A User
    @route POST /api/users/register
    @access public
*/
const register = asyncHandler(async(req, res) =>{
    const { username, email, password } = req.body

    if (!username || !email || !password ) {
        res.status(400)
        throw new Error('All Fields are Mandatory')
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error('User Already Registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const user = await User.create({username, email, password: hashedPassword })
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id:user.id, email:user.email})
    }else{
        res.status(400)
        throw new Error("User Data not Valid")
    }
    res.json({msg: "Register User"})


})

/*  @desc Login A User
    @route POST /api/users/login
    @access public
*/
const login = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All Fields are Mandatory...")
    }
    const user = await User.findOne({email})
    // compare user password with HashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "15m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or Password is not Valid")
    }
})

/*  @desc Get Info of the Logged in User
    @route POST /api/users/current
    @access private
*/
const current = asyncHandler(async(req, res) =>{

    res.json(req.user)
})

module.exports = {
    register,
    login,
    current
}