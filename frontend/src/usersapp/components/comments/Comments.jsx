import React, { useEffect, useState } from 'react'
// import { getComments as getCommentsApi,
//    createComment as createCommentApi, 
//    deleteComment as deleteCommentApi, 
//    updateComment as updateCommentApi
//   } from "../../../dummyData";
import Comment from './Comment';
import CommentForm from "./CommentForm";
import axios from "axios";

const Comments = ({userIds, posts, usernames}) => {
  const [comments, setComments] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
  // const [backendComments, setBackendComments] = useState([]);
  // const [activeComment, setActiveComment] = useState(null);
  // const rootComments = backendComments.filter(
  //   (backendComment) => backendComment.parentId === null);
  // console.log(backendComments);

  // const getReplies = (commentId) => {
  //   return backendComments
  //   .filter((backendComment) => backendComment.parentId === commentId)
  //   .sort((a, b) => 
  //   new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  // }

  const addComment = async (text) => {
    const credentials = {
      postId: posts,
      username: usernames,
      userId: userIds,
      body: text
    }
    const res = await axiosInstance.put(`/movies/${posts}/comments`, credentials, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data)
    getComment()
  };
  const getComment = async () => {
    
    const res = await axiosInstance.get(`/movies/find/${posts}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    setComments(res.data.comments, comments);
    console.log(res.data);
  };
  
  
  useEffect(() => {
    const getCommentData = async () => {
    
      const res = await axiosInstance.get(`/movies/find/${posts}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setComments(res.data.comments);
      console.log(res.data);
    };
    getCommentData()
    }, []);
  

    // console.log("addComment", text, parentId)
    // createCommentApi(text, parentId).then(comment => {
    //   setBackendComments([comment, ...backendComments])
    //   setActiveComment(null);
    // });
  

  // const deleteComment = (commentId) => {
  //   deleteCommentApi(commentId).then(() => {
  //     const updatedBackendComments = backendComments.filter(
  //       (backendComment) => backendComment.id !== commentId
  //     );
  //     setBackendComments(updatedBackendComments);
  //   });
  // }

  // const updateComment = (text, commentId) => {
  // updateCommentApi(text, commentId).then(() => {
  //   const updatedBackendComments = backendComments.map((backendComment) => {
  //     if(backendComment.id === commentId) {
  //       return {...backendComment, body: text};
  //     }
  //     return backendComment;
  //   });
  //   setBackendComments(updatedBackendComments);
  //   setActiveComment(null);
  // });
  // }

  // useEffect(() => {
  //  getCommentsApi().then((data) => {
  //    setBackendComments(data);
  //  });
  // }, []);


  return (
    <div className="commenttings">

      <div className="comments-container">
         {comments.map(comment => (
           <Comment comment={comment} userId={userIds} posts={posts}/>
         ))}
            
        
        
     
      <CommentForm submitlabel="write" handleSubmit={addComment} />
      </div>
     
    </div>
  )
}

export default Comments

























// import {useState, useEffect } from 'react';
// import "./comments.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Comment from '../comment/Comment';

// export default function Comments({comments}) {
//     const [user, setUser] = useState({});
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;



//     useEffect(() => {
//         const fetchUser = async () => {
//           const res = await axios.get(`https://domot-messenger.herokuapp.com/api/users?userId=${comments.userId}`);
//           setUser(res.data);
//         };
//         fetchUser();
//       }, [comments.userId]);

//     return (
//         <>
//         <div className="postTopLeft">
//             <Link to={`/profile/${user.username}`}>
//               <img
//                 className="postProfileImg"
//                 src={
//                   user.profilePicture
//                     ? PF + user.profilePicture
//                     : PF + "profile/avatar.png"
//                 }
//                 alt=""
//               />
//             </Link>
//             <span className="postUsername">{user.username}</span>
//             <span className="postDate">{comments.text}</span>
//           </div>
    

//         </>
//     )
// }
