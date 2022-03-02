import React from 'react'
import "./comment.scss";
import Comments from '../comments/Comments';
import { useLocation, Link } from "react-router-dom";
import { useEffect, useContext, useState,} from "react";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';
import { format } from "timeago.js";
import {  ArrowBackOutlined, Favorite, Share, Money, } from "@material-ui/icons";
import {FacebookShareButton, WhatsappShareButton} from "react-share";
import {FacebookIcon,  WhatsappIcon} from "react-share";




const CommentPage = () => {
    const location = useLocation();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    
    return (
        <>
       
    <div className="wrapper">
      <div className="imagecontainer">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      </Link>
     <div className="watch">
      <video
        className="video-comment"
        autoPlay
        progress
        controls
        src= {location.post?.video}
      />
      
    </div>
   </div>
      <div className="infocontainer">


            <div className="postsingleTopLeft">
            <Link to={`/profile/${location.post?.username}`}>
              <img
                className="postProfileImg"
                src={
                  location.post?.profilePicture
                    ? PF + location.post?.profilePicture
                    : PF + "profile/avatar.png"
                }
                alt=""
              />
              
            </Link>
            <span className="postuser"><h2>{location.post?.username}</h2></span>
            <span className="postDate">{format(location.post?.createdAt)}</span>
          </div>

            <div className="commentsingle">
              {/* <div className ="comment_button">
                  <Favorite className="commenticon"
                  />
                  <p>{location.post?.likes.length}</p>
              </div> */}
              <segment className ="">

                <FacebookShareButton 
                url="https://www.mictok.com" 
                quote={"Hey, Kindly check out my profile on Mictok.ng"}
                hashtag="#mictokng"
                >
                  <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
                </FacebookShareButton>

                <WhatsappShareButton
                title="Sharing mictok content"
                url="https://www.mictok.com"
                >
                <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
                </WhatsappShareButton>
                  
              </segment>
            </div>
            <div className="commentline"></div>
            {user.isFan === true ? "":
              <Comments userIds={user?._id} posts={location.post?._id} usernames={user?.username}/> 
             
            }
            {/* <input className="inputcontainer" placeholder="Write A Comment"/>
              <button className="comment-btn">SUBMIT</button> */}
                
            </div>
            
        </div>
</>
    )
}

export default CommentPage

            
        
                
               