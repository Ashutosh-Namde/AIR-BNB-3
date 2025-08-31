import React, { useContext, useState } from "react";
import { useComments } from "../context/comment";
import { BookingDataContext } from "../context/BookingContext";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const { addComment } = useComments();
  const { currentBooking } = useContext(BookingDataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(text, postId);
    setText("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-3 py-2 rounded-xl outline-none text-sm"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
