import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const commentContext = createContext();

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
      const {serverUrl} = useContext(authDataContext)
  

  const fetchComments = async (listingId) => {
    try {
      const res = await axios.get(`${serverUrl}/comment/get/${listingId}`);
      setComments(res.data.comments);
      console.log("fetch data "+res.data)
    } catch (err) {
      console.error("Error loading comments:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };


  // Add a new comment to a listing
  // const handleAddComment = async (listingId) => {
  //   try {
  //     if (!text.trim()) return;
  //     await axios.post(
  //       `/create/Comment/${listingId}`,
  //       { text },
  //       { withCredentials: true }
  //     );
  //     setText('');
  //     fetchComments(listingId); // refresh
  //   } catch (err) {
  //     console.error('Error adding comment:', err);
  //     setError('Failed to add comment');
  //   }
  // };

  const handleAddComment = async(listingId)=>{
       
   try {
     const result = await axios.post(serverUrl +`/comment/create/${listingId}`,{text},{withCredentials:true})
    
    console.log("comment , "+ result.data.comment);
    console.log("comment", JSON.stringify(comments));

    
   } catch (error) {
    console.log("error in addcomment" + error.response.data);
    
   }
    

  }
  const value = {
    comments,
    setComments,
    text,
    setText,
    loading,
    error,
    handleAddComment,
    fetchComments,
  };

  return (
    <commentContext.Provider value={value}>
      {children}
    </commentContext.Provider>
  );
};

export default CommentContextProvider;
