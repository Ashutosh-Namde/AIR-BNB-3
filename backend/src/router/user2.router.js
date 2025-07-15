const express = require("express")
const { isAuth } = require("../middleware/isAuth")
const { getCurrentUser } = require("../controller/user2.controller")

const userRouter = express.Router()

userRouter.get("/currentUser",isAuth,getCurrentUser)

module.exports = userRouter