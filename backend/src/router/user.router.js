const express = require("express")
const { registerUserController } = require("../controller/user.controller")

const router = express.Router()

router.post("/register" , registerUserController)

module.exports = router