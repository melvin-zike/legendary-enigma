import "./widgetSmall.css";
import { Visibility } from "@material-ui/icons";

import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function WidgetSmall() {
    const [ newUsers, setNewUsers ] = useState([]);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });

    useEffect(() => {
      const getNewUsers = async ()=> {
          try{
                const res = await axiosInstance.get("/users?new=true", {
                    headers: {
                        token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setNewUsers(res.data);
          }catch(err){
            console.log(err);
          }
      }
      getNewUsers();
    }, [])
    return (
        <div className="widgetSmall">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map((user, index) => (
                    <li key={index} className="widgetSmListItem">
                    <img src={user.profilePic || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} alt="" className="widgetSmImg"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmallBtn">
                     <Visibility className="widgetSmIcon"/>
                     Diplay   
                    </button>
                </li>
                ))}
                
              
            </ul>
        </div>
    )
}
