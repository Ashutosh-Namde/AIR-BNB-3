import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";
import { useParams } from "react-router-dom";

export const CommentContext = createContext();

export const useComments = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const {serverUrl} = useContext(authDataContext)

  

  // Fetch comments by postId
  const fetchComments = async (id) => {
    console.log(id,"qwert");
    
    try {
      const res = await axios.get(`http://localhost:3000/comment/${id}`, {
        withCredentials: true,
      });
      setComments(res.data);
      console.log(res.data,"fetch details");
      
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Add new comment
  const addComment = async (text, postId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/comment/addComment`,
        { text, postId },
        { withCredentials: true }
      );
      setComments((prev) => [res.data, ...prev]); 
      console.log("comments" , res.data);
      
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};
