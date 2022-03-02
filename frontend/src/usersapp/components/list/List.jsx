import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import axios from "axios";
import "./list.scss";

export default function List() {
const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers ] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    setIsLoading(true);
    const getRandomContent = async () => {
      try{
        const res = await axiosInstance.get(`/users/random-users`,{
          headers: {
            token:
            "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
       
        setUsers(res.data);
        setIsLoading(false);
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent();
  }, [])


  return (
    <div className="list">
      <span className="listTitle">Artist zone</span>
      <div className="container">
      {users.map((user) => (
        <div key={user._id}>
          <ListItem user={user}/>  
        </div>
             
          ))}
      </div>
       
      </div>
    
  );
}