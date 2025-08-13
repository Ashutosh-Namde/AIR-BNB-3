const Comment = require("../model/comment.model");



const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { listingId } = req.params;

    // Basic validation
    if (!text || !listingId) {
      return res.status(400).json({ message: "Text and listingId are required." });
    }

    // Create new comment
    const comment = await Comment.create({
      user: req.userId,       // set from auth middleware
      listing: listingId,     // passed in URL
      text,
    });

    return res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};




const getAllComment = async (req,res)=>{
     try {
    const comments = await Comment.find({ listing: req.params.listingId })
      .populate("user", "name email");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
}

module.exports = {
    createComment,
    getAllComment
}