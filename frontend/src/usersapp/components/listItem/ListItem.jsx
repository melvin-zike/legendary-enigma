import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  Visibility,
  Favorite,
  LocationCity,
  Room,
} from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';
import { Link } from "react-router-dom";

export default function ListItem({ user }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(user.likes?.length);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    setIsLiked(user.likes?.includes(currentUser._id));
  }, [currentUser._id, user.likes]);
  

  //Liked handler
  const likeHandler = () => {
    try {
      axiosInstance.put("/users/" + user._id + "/like", { userId: currentUser._id }, {
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
  
  return (
    <>
    <div className="atists">
         <div className="artist-page">
         <div className="art-img-container">
         <img
                className="art-img"
                // src={
                //   user.coverPicture
                //     ? PF + user.coverPicture
                //     : PF + "profile/avatar.png"
                // }
                src={user.profilePic ? user.profilePic : PF + "profile/avatar.png"}
                alt=""
              />
          {isLiked === true ? <span className="art-name"><Favorite style={{color: "red"}} className="art-icon"/></span>
        : <span className="art-name"><Favorite className="art-icon"onClick={() =>likeHandler}/></span>}
          
         </div>
         <div className="art-info">
          <Link to={`/profile/${user.username}`}>
            <Visibility className="art-info-img"/>    
          </Link>
          
         <div className="engagement-info">
          <span className="art-channel">{user.username}</span>
          <span className="art-details">{like} likes <Room className="art-info-img2"/>{user.state}</span>
         </div>
         
         </div>
         <div className="art-sponsor">
         {user.sponsorship === 1
                ? "Looking for General Career Sponsorship"
                : user.sponsorship === 2
                ? "Looking for Free music production"
                : user.sponsorship === 3
                ? "Looking for Record Deal"
                : user.sponsorship === 4
                ? "Looking for Money to make a music video"
                : "-"}
         </div>
       </div>    
    </div>
    
    </>
     
  );
}