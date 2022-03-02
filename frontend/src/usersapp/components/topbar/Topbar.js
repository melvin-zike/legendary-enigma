import "./topbar.scss";
import { Search, Person, Chat, Notifications, PersonalVideo } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { logout } from "../../../context/authContext/AuthActions";
import axios from "axios";

export default function Topbar({socket}) {

  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  // useEffect(() => {
  //   socket?.on("getNotification", data => {
  //      setNotifications((prev) => [...prev, data])
  //   })
  // }, [socket])
  

  // const displayNotification = ({senderName, spec}) => {
  //   let action;
  //   if(spec===1){
  //     action="liked";
  //   }
  //   else if(spec ===2){
  //     action="voted";
  //   }
  //   else if(spec===3){
  //     action="donated";
  //   }
  //   else if(spec===4){
  //     action="commented";
  //   }
  //   else if(spec===5){
  //     action="viewed";
  //   }
  //   else{
  //     action="shared";
  //   }
  //   return (
  //     <div className="topbarnotifications">{`${senderName} ${action} your video`}</div>
  //   )
  // }

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const res = await axiosInstance.get("/users/all");
      setUsers(res.data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  }
  

  // const logOut = () => {
  //   localStorage.removeItem('user');
  //   window.location.reload();
  // }


  return (
    <div className="topbarContainer">
      
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="/assets/profile/logolatest3.png" className="logo" />
          {/* <img src="/miclogg.PNG" alt="image" /> */}
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="/assets/profile/micmini.PNG" className="logo-mini" />
          {/* <img src="/miclogg.PNG" alt="image" /> */}
        </Link>
      </div>
      {user ? 
        
        <div className="topbarCenter">
          <div className="searchbar">
          <div className ="search-drop">
              {loading ? "" : (
                users.filter((value) => {
                    if(searchTitle === ""){
                      return ""; 
                    }else if(value.username.toLowerCase().includes(searchTitle.toLowerCase())){
                          return value;
                    }
                }).map((use) => (
                  <div key={use?._id} className ="search-items">
                    <Link to={`/profile/${use?.username}`} >
                    <img
                     src={
                    use?.profilePicture
                    ? PF + use?.profilePicture
                    : PF + "profile/avatar.png"
                       }
                   alt=""
                   className="topbarImg"
                   />
                   </Link>
                    <span className ="search-items-name">{use?.username}</span>
                    
                </div>
                ))
              )}
            </div>
            <Search className="searchIcon" />
            {/* <TesxtInput className="searchInput"/> */}
            <input
              placeholder="Search for Artists by username"
              className="searchInput"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            
          </div>
          
        </div> : ""
      
     }



    {user ?   
      <div className="topbarRight">
        <Link to="patron-page">
      <button className="patronbtn">Become Patron</button>
        </Link>
        <div className="topbarLinks">
          <span className="topbarLink" onClick={() => dispatch(logout())}>Logout</span>
          
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person className="chatsbadge" />
            <span className="topbarIconBadge chatsbadge">1</span>
          </div> */}
          {/* <div className="topbarIconItem">
            <Chat className="chatsbadge"/>
            <span className="topbarIconBadge chatsbadge">2</span>
          </div> */}
          
          <div className="topbarIconItem">
            <Notifications className="notice" onClick={() => setOpen(!open)}/>
            {/* {notifications.length > 0 && 
            <span className="topbarIconBadge ">{notifications.length}</span>
            } */}
          </div>
          {/* {open && (
            <div className="notification">
            {notifications.map((n) => displayNotification(n))}
            <button className="nbotton" onClick={handleRead}>Mark as read</button>
          </div>
            )} */}
          
        </div>
       <div className="topbarImgDiv">
       <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePic
                ? user?.profilePic
                : PF + "profile/avatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
       {/* <span className="topbarUserName">{user?.username}</span> */}
       </div>
        
        
      </div> : 
      
      <div className="topbarRight">
        
        <div className="topbarLinks">
          <Link className ="links" to="/register">
          <span className="topbarLink" >Register</span>
          </Link>
          <Link className ="links" to="/login">
          <span className="topbarLink" >Login</span>
          </Link>
          <Link className ="links" to="/about-us">
          <span className="topbarLink" >About</span>
          </Link>
        </div>
        <div className="topbarIcons">
    
        </div>
        <Link to="patron-page">
      <button className="patronbtn">Become Patron</button>
        </Link>
      </div>
      }
    </div>
  );
}