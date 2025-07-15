const express = require("express")
const cors = require("cors")
const router = require("./router/user.router")
const cookieParser = require("cookie-parser")
const userRouter = require("./router/user2.router")
const listingRouter = require("./router/listing.router")
// import cors from 'cors'
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/auth" , router)
app.use("/user" , userRouter)
app.use("/listing" , listingRouter)


module.exports = app