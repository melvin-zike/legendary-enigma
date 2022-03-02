import { useContext } from "react";
import Sidebar from "../../../usersapp/components/sidebar/Sidebar";
import Feed from "../../../usersapp/components/feed/Feed";
// import Rightbar from "../../../usersapp/components/rightbar/Rightbar";
import Topbar from "../../../usersapp/components/topbar/Topbar";
import Ads from "../../../usersapp/components/ads/Ads";
import { AuthContext } from '../../../context/authContext/AuthContext';
import "./home.scss"

export default function Home({type}) {

  const { user } = useContext(AuthContext);
  return (
    <>
    <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        
        <Ads type={type}/>
        {/* {user.isFan === false ? "" : user.isFan === true ? <Rightbar/> : ""} */}
        
      </div>
    </>
  );
}

