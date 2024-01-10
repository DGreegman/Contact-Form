const express = require('express')
const dotenv = require('dotenv').config()
const contactRouter = require('./routes/contactRoutes')
const userRoute = require('./routes/userRoute')
const errorhandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const app = express()

connectDb()
const port = process.env.PORT || 5000

// to be able to pass body when creating a post you'll use the middleware below
app.use(express.json())
app.use(errorhandler)
app.use("/api/contact", contactRouter)
app.use("/api/users", userRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})