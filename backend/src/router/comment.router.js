const express = require("express")
const { isAuth } = require("../middleware/isAuth")
const { createComment, getAllComment } = require("../controller/comment.controller")

const commentRouter = express.Router()


commentRouter.post("/create/:listingId",isAuth,createComment)
commentRouter.get("/get/:listingId", isAuth,getAllComment)



module.exports = commentRouter