import React, { useEffect } from "react";
import { useComments } from "../context/comment";
import CommentForm from "./CommentForm";

const CommentsList = ({ postId }) => {
  const { comments, fetchComments } = useComments();

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
      const interval = setInterval(() => {
        fetchComments(postId);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [postId]);

  return (
    <div className="mt-6 p-4 bg-white shadow-lg rounded-2xl w-full">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-700">Reviews</h3>
      
     
      <CommentForm postId={postId} />

      {/* Comments List */}
      <ul className="mt-4 space-y-3 max-h-[250px] overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No comments yet. Be the first one! 🎉</p>
        ) : (
          comments.map((c) => (
            <li 
              key={c._id} 
              className="bg-gray-50 p-3 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-800">
                <span className="font-semibold text-blue-600">{c.user?.email}:</span>{" "}
                {c.text}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
