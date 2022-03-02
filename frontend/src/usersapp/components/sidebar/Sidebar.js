import "./sidebar.scss";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/authContext/AuthContext';
import axios from "axios";
import {
  PlayCircleFilledOutlined,
  Group,
  CardGiftcard,
  House,
  Cloud,
} from "@material-ui/icons";
import Online from "../online/Online";

// import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [ newUsers, setNewUsers ] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    const getNewUsers = async ()=> {
        try{
              const res = await axiosInstance.get("/users/all?new=true", {
                headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              });
              setNewUsers(res.data);
        }catch(err){
          console.log(err);
        }
    }
    getNewUsers();
  }, [])

  
  return (
    <div className="sidebar1">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to="/" className="messengerLink">
            <House className="sidebarIcon" />
            
            <span className="sidebarListItemText"><h3>Home</h3></span>
            </Link>
          </li>
          <li className="sidebarListItem">
            {user?.isFan === true ? "" :
            <Link to="/newproduct" className="messengerLink">
            <Cloud className="sidebarIcon" />
            
            <span className="sidebarListItemText others" ><h3>Create</h3></span>
            </Link>
            }     
          </li>
          <li className="sidebarListItem">
          <Link to="/playground" className="messengerLink">
            <PlayCircleFilledOutlined className="sidebarIcon" />
           
            <span className="sidebarListItemText others"><h3>Most Recommended Artists</h3></span>
            </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/weekly-challenge" className="messengerLink">
            <CardGiftcard className="sidebarIcon" />
           
            <span className="sidebarListItemText"><h3>Weekly Challenge</h3></span>
            </Link>
          </li>
          <li className="sidebarListItem">
          <Link to="/about-us" className="messengerLink">
            <Group className="sidebarIcon" />
            
            <span className="sidebarListItemText"><h3>About Our Empowerment Scheme</h3></span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            
            <Shop className="sidebarIcon" />
            <a href="https://www.domot.ng" className="messengerLink">
            <span className="sidebarListItemText others" ><h3>MarketPlace</h3></span>
            </a>
          </li> */}
          {/* <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>

          <button className="sidebarButton">Show More</button> */}
        </ul>
        
        <hr className="sidebarHr" />
        <h4 className="rightbarTitle">New Comers</h4>
        <ul className="rightbarFriendList">
          {newUsers.map((u) => (
            <div key={u._id}>
               <Online user={u} />
            </div>
           
          ))}
        </ul>
        <br />
        <hr />
        <br />
        <h4 className="rightbarTitle">New Challenge</h4>
        <div className="challengeLeft"> 
            <Link to="/challenge-page">
            <CardGiftcard />
           </Link>
          </div>
          
      </div>
    </div>
  );
}