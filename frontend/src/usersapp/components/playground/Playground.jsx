import Featured from "../featured/Featured";
import "./playground.scss";
import { useState, useEffect } from "react";
import List from "../list/List";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";
//import { ListSharp } from "@material-ui/icons";

const Playground = ({type, socket}) => {
  // const [lists, setLists] = useState([]);
  // const [genre, setGenre] = useState(null);

  // useEffect(() => {
  //   const getRandomLists = async () => {
  //     try{
  //       const res = await axios.get(`http://localhost:4000/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : "" }`, {
  //         headers: {
  //           token:
  //           "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
  //         }
  //       });
  //       // console.log(res)
  //       setLists(res.data)
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   getRandomLists();
  // }, [type, genre])
  return (
  <>
  <div className="playground">
      <div className="side-div">
      <Sidebar />
      </div> 
      <div className="play-banner">
      <Featured type={type}/>
        {/* <Rightbar socket={socket}/> */}  
      <List socket={socket}/>
     
      </div>
      
      
     
      
    </div>
  </>

    
  );
};

export default Playground;