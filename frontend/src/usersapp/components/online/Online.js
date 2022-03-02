import "./online.scss";
import { Link } from "react-router-dom";


export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="onlineFriend" >
      <div className="onlineProfileImgContainer" >
      <Link to={`/profile/${user.username}`}>
        <img className="onlineProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF + "profile/avatar.png"} alt="" />
        <span className="onlineOnline"></span>
        </Link>
      </div>
     <div className="onlineUserInfomation">
     <li className="onlineUsername">{user.username}<button className="verify">New</button></li>
     
     </div>
    </div>
  );
}