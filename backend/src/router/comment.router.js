const express = require("express")
const { isAuth } = require("../middleware/isAuth")
const {  addComment, getCommentsByPost } = require("../controller/comment.controller")

const commentRouter = express.Router()



commentRouter.post("/addComment", isAuth, addComment); // Add comment
commentRouter.get("/:id", getCommentsByPost); // Get comments for a post


module.exports = commentRouter