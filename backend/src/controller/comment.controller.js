const Comment = require("../model/comment.model");

// Add new comment
exports.addComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    console.log(text,postId);
    
    const userId = req.userId; // JWT auth middleware se user id aayegi
    console.log(userId,"userid");
    

    const comment = await Comment.create({
      text,
      user: userId,
      post: postId,
    });

    res.status(201).json({comment,success:true, message:"comment created sucessfull"});
  } catch (error) {
    res.status(409).json({ message: "Error adding comment", error });
  }
};

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,"id");
    
    const comments = await Comment.find({ post: id })
      .populate("user") 
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(409).json({ message: "Error fetching comments", error });
  }
};
