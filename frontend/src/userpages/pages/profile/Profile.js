import "./profile.scss";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import Sidebar from "../../../usersapp/components/sidebar/Sidebar";
import Feed from "../../../usersapp/components/feed/Feed";
import WeeklyChallengeList from "../../../usersapp/components/weeklyChallenge/WeeklyChallengeList";
import Rightbar from "../../../usersapp/components/rightbar/Rightbar";
import Topbar from "../../../usersapp/components/topbar/Topbar";
import { useEffect, useState, useContext } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import axios from "axios";
import { useParams } from "react-router";
import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/authContext/AuthContext';

export default function Profile({socket}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progressing, setProgressing] = useState(0);
  const username = useParams().username;
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

//Get Users by username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?username=${username}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  //Get  and update Current User donations
  useEffect(() => { 
    const fetchBalance = async () => {
      const res =await axiosInstance.get(`/users?username=${currentUser?.username}` , {
        // await axios.get(`/users?userId=${post.userId}&page=${pageNumber}&per_page=10`
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
       //  Get the existing data
     let updateDonation = localStorage.getItem('user');

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
     updateDonation = updateDonation ? JSON.parse(updateDonation) : {};

// Add new data to localStorage Array
     updateDonation['donation'] = res.data.donation;

// Save back to localStorage
     localStorage.setItem('user', JSON.stringify(updateDonation));
    };
    fetchBalance();
  }, [currentUser?.username]);



  //Upload Profile Picture
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file?.name;
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file)
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% Done.");
        setProgressing(Math.floor(progress));
      },
      (err) => {console.log(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfile((prev) => {
           return { ...prev, [item.label]: downloadURL };
          })
        });
        setUploaded((prev) => prev + 1)
       });
    });
};

const handleProfile = async (e) => {
  e.preventDefault();
  upload([
    {file: image, label: "image"}
  ]);
  
  
}

const handleSave = async () => {
  const id = currentUser._id;
  const profilePicture = profile.image;
  const newProfilePic = profilePicture.toString();
  console.log(newProfilePic);
  try {
    const res = await axiosInstance.put(`/users/${currentUser._id}/update`, {newProfilePic: newProfilePic, id: id }, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //  Get the existing data
let existing = localStorage.getItem('user');

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? JSON.parse(existing) : {};

// Add new data to localStorage Array
existing['profilePic'] = res.data.profilePic;

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
      <div className="profile">
        <div className="side-div"><Sidebar /></div>
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={
                  
             user.profilePic ? user.profilePic : PF + "profile/avatar.png"
                }
                alt=""
              />
               <span className="profileInfoName">{user.username}</span>
               {image && (
            <div className="profileImgContainer">
            <img className="profileImg"  src={URL.createObjectURL(image)} alt="" />
            {uploaded === 1 ? (
            <button className="upload-profile-btn" onClick={handleSave}>Save</button>
            ) : (
            <button className="upload-profile-btn" onClick={handleProfile}>Upload</button>
             ) 
            }
            
            <Cancel className="shareCancelImg" onClick={() => setImage(null)} />
             </div>
             )}
               {user.username === currentUser.username ?            
               <label htmlFor="file" className="update-photo"> 
               <PermMedia htmlColor="tomato" className="shareIcon" />
               <input
                 style={{ display: "none" }}
                 type="file"
                 id="file"
                 name="image"
                 accept=".png,.jpeg,.jpg"
                 onChange={(e) => setImage(e.target.files[0])}
               /> 
             
               </label>
              
               
                 
                 : "" }
               <div className="profileInfoButton">
               {user.username === currentUser.username || currentUser.isAdmin === true ? 
                 <Link to="/edit-page">
                 <button className="edit-button">Edit Profile</button>
                 </Link>
                 : "" }
               
               </div>
              <div className="following-bar">
                <div className ="follower-items">
                <span><p>{user.likes?.length} likes</p></span>
                </div>
               
               </div>
            </div>
            <div className="profileInfo">
              {/* <Star /> */}
              <span className="profileInfoDesc">
                {user.isFan ? 
              <h3 >Hi, i'm a fan. Here to help someone achieve His/Her Dreams.
              
              </h3> : user.isAdmin ?""
              : <h3>This is my page and my videos kindly drop a donation
              I greatly apprecitiate your donation to my career!
              
              </h3> 
              }
                
                </span>
            </div>
           

          </div>
          <div className="profileRightBottom">
          <Rightbar user={user}/>
          <div className="showvideos">
            <div>       
                <Feed socket={socket} username={username} /> 
           </div>     
           
          </div>
          
          </div>
        </div>
      </div>
    </>
  );
}