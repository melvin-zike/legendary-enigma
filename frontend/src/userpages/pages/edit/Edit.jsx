import { useState, useEffect, useRef, useContext } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import Topbar from "../../../usersapp/components/topbar/Topbar"
import Sidebar from '../../../usersapp/components/sidebar/Sidebar'
import { Link } from "react-router-dom";
import "./edit.scss";
import { AuthContext } from '../../../context/authContext/AuthContext';


export default function Edit() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [edit, setEdit] = useState("");
  const accountNumber = useRef();
  // const history = useHistory();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });


  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/users/${user._id}/update-account`, {accountNumber:accountNumber.current.value, id: user._id }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      console.log(res)
       //  Get the existing data
let existing = localStorage.getItem('user');

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? JSON.parse(existing) : {};

// Add new data to localStorage Array
existing['accountNumber'] = res.data.accountNumber;

// Save back to localStorage
localStorage.setItem('user', JSON.stringify(existing));
    console.log(res)

    window.location.reload();
    } catch (err) {
      console.log(err);
    }
   
  };

  return (
    <>
    <Topbar />
    <div className="edit-users">
      <Sidebar />
      <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic ? user.profilePic :PF + "profile/avatar.png" }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.email}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user._id}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.state}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleEdit}>
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Account Number <h6>Vbank account only</h6></label>
                <input
                  type="number"
                  ref={accountNumber}
                  placeholder={user.accountNumber}
                  className="userUpdateInput"
                />
              </div>
             
              <input type="submit" className="userUpdateButton" value="Update"/>
            </div>
            
          </form>
        </div>
      </div>
    </div>
    </div>
    
    </>
   
  );
}