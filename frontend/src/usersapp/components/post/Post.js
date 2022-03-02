import "./post.scss";
import { useContext, useEffect, useState, useRef} from "react";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { MoreVert, Chat, MusicNote, Favorite, Visibility, Share, Money, ThumbUp, } from "@material-ui/icons";
import axios from "axios";
import LazyLoad from "react-lazyload";
import Ticker from "react-ticker"

import { format } from "timeago.js";
import { Link } from "react-router-dom";
import {deleteMovie } from "../../../context/movieContext/apiCalls";
import { MovieContext } from "../../../context/movieContext/MovieContext";
import { AuthContext } from '../../../context/authContext/AuthContext';

export default function Post({ post, }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [playing, setPlaying] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const videoRef = useRef(null);
  // const [pageNumber, setPageNumber] = useState(1);
  
  const [votes, setVotes] = useState(post.votes.length);
  const [isVoted, setIsVoted] = useState(false);
  const {dispatch} = useContext(MovieContext)
  // const [isView, setIsView] = useState(false);


  //check like
  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);

 //check votes 
  useEffect(() => {
    setIsVoted(post.votes.includes(currentUser?._id));
  }, [currentUser?._id, post.votes]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
   };

  useEffect(() => {
    
    const fetchUser = async () => {
      const res =await axiosInstance.get(`/users?userId=${post.userId}` , {
        // await axios.get(`/users?userId=${post.userId}&page=${pageNumber}&per_page=10`
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUser(res.data);
     
    };
    fetchUser();
  }, [post.userId]);

  //Like Handler...............................
  const likeHandler = (spec) => {
    try {
      axiosInstance.put("/users/" + user._id + "/like", { userId: currentUser?._id }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    // socket?.emit("sendNotification", {
    //   senderName:currentUser.username,
    //   receiverName:user.username,
    //   spec,
    // })
  };


  //Votes Handler------------------------------------
  const handleClick = async (type) => {
    const credent = {
      postId: post?._id,
      userId: currentUser?._id,
    }
      const id = post?.userId;
    try {
        const res = await axiosInstance.put(`/movies/${id}/votes`, credent, {
 
          headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }, 
        });
        if(post.votes.includes(currentUser?._id)){
          console.log("You already voted");
          setIsVoted(isVoted);
        }else{
          setVotes(votes + 1);
          setIsVoted(true);

          // socket?.emit("sendNotification", {
          //   senderName:currentUser?.username,
          //   receiverName: post?.username,
          //   type
          // })
        }
        
        
      console.log(res);
    } catch (err) {
    }
  };

  // const handleView = (type) => {
  //   socket?.emit("sendNotification", {
  //     senderName:currentUser?.username,
  //     receiverName: post?.username,
  //     type
  //   })
  // }

  const onVideoPress = () => {
if(playing){
  videoRef.current.pause();
  setPlaying(false);
}else{
  videoRef.current.play();
  setPlaying(true);
}
  }

  //Payment
  const config = {
    email: currentUser?.email,
    amount: 500 * 100,
    reference: (new Date()).getTime().toString(),
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    // split: { //if you want to use transaction split
    //     "type": "percentage",
    //     "bearer_type": "all",
    //     "subaccounts": [
    //         {
    //             "subaccount": "ACCT_mtl3xzwjfhcldkw",
    //             "share": 30
    //         },
    //         {
    //             "subaccount": "ACCT_y19ht107y44o294",
    //             "share": 20
    //         }
    //     ]
    // }
};

const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    handleClick(1)
};

const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
          <ThumbUp className="videosidebaricon"
               onClick ={()=> {
                initializePayment(onSuccess, onClose)
               }}/>
        </div>
    );

    // sendDescription();
};

// const sendDescription = () => {

// }

const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess,
    onClose
};
  
const loadMore = () => {

}
  return (
    <>
    { post.isChallenge ===false ? (
      <div className="posts">
   <LazyLoad
   >
   <div className="postTop">
       <div className="postTopLeft">
         <Link to={`/profile/${user.username}`}>
           <img
             className="postProfileImg"
             src={
               user.profilePic
                 ? user.profilePic
                 : PF + "profile/avatar.png"
             }
             alt=""
           />
         </Link>
         <span className="postUsername"><h3><b>{user.username}</b></h3></span>
         <span className="postDate">{format(post.createdAt)}</span>
       </div>
       {post.userId === currentUser._id || currentUser.isAdmin === true ? 
         <div className="postTopRight">
         <MoreVert onClick={() => handleDelete(post._id)} alt="delete" />
       </div>: ""
       }
       
       
     </div>
     <p className="postText">{post?.desc}</p>
     {/* <Card desc={post?.desc} className="postdesc"/> */}
    <div className="postWrapper">
      
 <div className="postCenter">
       {/* <img className="postImg" src={PF + post.img} alt="" /> */}
       {/* video */}
   <div className="video">
     <video
     className="video-player"
     loop
     onClick={()=>onVideoPress}
     ref={videoRef}
     src= {post.video}
   />
   {/* video footer */}
       <div className="videofooter">
         <div className="videoFooter_text">
             <h3>@{user.username}</h3>
             <p>this is a description</p>
             <div className="video_ticker">
             <MusicNote className="footer-icon"/>
             <Ticker mode="smooth">
               {({ index }) => (
                 <>
                 <p>Hello from mictok</p>
                 </>
               )

               }
             </Ticker>
             </div>
             
         </div>

         <img className="video-logo" src="https://static.thenounproject.com/png/934821-200.png" alt=""/>
     </div>
     
     {/* video side bar */}
     <div className="videoSidebar">
          <p className="recommended">Recommend for Sponsorship</p>
           <div className ="videoSidebar_button">
           {isVoted === true ? <ThumbUp className="videosidebaricon" style={{color: "green"}} /> :
               <PaystackHookExample />
             }
               <p className="vote-number">{votes}</p>
           </div>
          
           <div className ="videoSidebar_button">
               <Link className="links" to={{pathname: `/post/${post._id}`, post: post}}>
               <Visibility className="videosidebaricon"/>
               </Link>
               <p className="view-number">{post.comments.length}</p>
           </div>
           <div className ="videoSidebar_button">
           {isLiked === true ? <Favorite className="videosidebaricon" style={{color: "red"}} /> :
               <Favorite className="videosidebaricon" onClick ={()=> likeHandler}/>
            }
               <p className="like-number">{like}</p>
           </div>
           <Link className="links" to={{pathname: `/give/${post?.userId}`, post: post}}>
           <button className="donate-btn-post">DONATE</button>
           </Link>
           
           {/* <div className ="videoSidebar_button">
               <Share className="videosidebaricon"/>
               <p>10</p>
           </div> */}
         </div>
     </div> 
    
     
     </div>
     
     {/* <div className="postBottom">
       
         
         <span className="postLikeCounter">{like}likes</span>
         
         <span className="postLikeCounter">{post.credit.length}money</span>
        
         <span className="postCommentText">{post.comments.length} comments</span>

     </div>  */}

     {/* <div className="commentBottom">
       <div className="postBottomLeft">
         <img
           className="likeIcon"
           src={`${PF}/posts/like.jpg`}
           onClick={likeHandler}
           alt=""
         />
         <span className="postLikeCounter"></span>
         
       </div>
       <div className="postBottomRight">
         <span className="postCommentText"><Chat className="commentIcon" /></span>
       </div>
       
     </div>
     <div className="hLine">
     </div>
     {/* <p>{post.comments.map((c) => (
           <Comments comments={c} />
         ))}</p>
     <Commentry sender={currentUser} actualPost={post} user={user}/> */}
      
   </div>
   <hr className="post-line"/>
   </LazyLoad>
 </div>
    ) : (
       ""
     )
   }   
      
    
       {/* <button>Load More Videos</button> */}
    </>
  );
}