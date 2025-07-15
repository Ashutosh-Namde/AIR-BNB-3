const express = require("express")

const { registerUserController, loginUserController, logoutUserController } = require("../controller/user.controller")

const router = express.Router()

router.post("/register" , registerUserController)
router.post("/login",loginUserController)
router.get("/logout",logoutUserController)

module.exports = router