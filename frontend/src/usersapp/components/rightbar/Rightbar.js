import "./rightbar.scss"; 
// import { Users } from "../../../dummyData";
import Online from "../online/Online";
import Ticker from "react-ticker"
import Cb from "../cb/Cb";
import Chats from "../fanchat/Chats";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/authContext/AuthContext';

import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user, socket }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ newBalance, setNewBalance ] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const HomeRightbar = () => {
    return (
      <div className="rightbarhome">
        <div className="fanzone-chat">
        <div className="wrap">
        {/* {!showChat ?
        <div className="joinChatContainer">
        <h3 className="chat-header-text">Fan Zone....</h3>    
        <button className="joinchat-button" onClick={joinRoom}>Join Room</button>

         </div>
         :
         <Chats socket={socket} room={room}/> 
         } */}
        </div>
        <ul className="rightbarFriendList">
          {/* {newUsers.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
        </div>
        
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="rightbarprofile">
        { user.username !== currentUser.username ? "" : <Cb className="atm" creditOwner={currentUser} />}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Location:</span>
            <span className="rightbarInfoValue">{user.state}</span>
          </div>
          { user.username !== currentUser.username ? "" :  
          <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Balance:</span>
          {user?.donation == 0 ?
            <span style ={{color: "#333"}} className="rightbarInfoValuecash">₦{user?.donation}</span> :
            <span className="rightbarInfoValuecash">₦{user?.donation}</span>
          }
          
          {/* <span className="rightbarInfoValue"><button className="delete">Reharge</button></span>
          <span className="rightbarInfoValue"><button className="withdraw">Withdraw</button></span> */}
        </div>
          }
          
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Sponsorship:</span>
            <span className="rightbarInfoValue">
              {user.sponsorship === 1
                ? "General Career Sponsorship"
                : user.sponsorship === 2
                ? "Free music production"
                : user.sponsorship === 3
                ? "Record Deal"
                : user.sponsorship === 4
                ? "Want to sponsor an Artist"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle"> My Videos</h4>
        
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}