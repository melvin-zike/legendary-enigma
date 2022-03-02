import { useContext } from 'react'
import React, { useEffect, useState } from 'react'
import ReplyForm from './ReplyForm';
import "./comments.css";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext'; 


const Comment = ({comment, userId }) => {
    const { user } = useContext(AuthContext);
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    // const canReply = Boolean(user.userId); 
    // const canDelete = user.userId === comment.userId;
    const [deleteComment, setDeleteComment] = useState([]);
    const [showDelete, setShowDelete] = useState(user._Id === comment.userId);


    // const setDeleteComment = async (item) => {
    //       try{
    //     const res = await axios.delete(`/movies/${posts}/reply`, credentials, {
    //       headers: {
    //         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //       },
    //     });
    //     console.log(res.data)
    //     getReply()
    //       }catch(err){
    //         console.log(err);
    //       }
       
    //   }; 
      
     
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img className="comment-image" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    {comment.userId === userId ? <div className="comment-author" style={{color: "green"}}>{comment.username}</div> :
                      <div className="comment-author">{comment.username}</div>
                    }
                    
                    <div>{comment.createdAt}</div>
                </div>
                {comment?.userId === userId ?  <div className="comment-text" style={{color: "green"}}>{comment.body}</div>
                : <div className="comment-text">{comment.body}</div>
            }
    
        
                <div className="comment-actions">
                    
                    {showDelete && (
                    <div className="comment-action" 
                    onClick={() => setDeleteComment(comment?._id)}>Delete</div>
                     )}
                    
                </div>
                
                {/* {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) =>(
                            <Comment 
                           
                            
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Comment
