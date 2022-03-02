import "./challengePage.scss";
import { useState, useEffect } from "react";
import Challenge from "./Challenge";
import axios from "axios";
import Sidebar from "../../../usersapp/components/sidebar/Sidebar";
//import { ListSharp } from "@material-ui/icons";

const ChallengePage = () => {
  const [challenge, setChallenge] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axiosInstance.get(`/challenges`, {
          headers: {
            token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        // console.log(res)
        setChallenge(res.data)
        console.log(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  }, [])

  return (
     <div className="challenge">
      <Sidebar />
      <div className="challenge-main">
      <h1 className="challenge-item-title">WELCOME TO OUR GIVE AWAY AND WEEKLY CHALLENGE</h1>
      {challenge.map((c) => (
        <div className="challenge-page" key={c?._id}>
          <img src={c?.img} className="challenge-page-img" />
           <h2 className="challenge-page-title">{c?.title}</h2>
           <p className="challenge-page-desc">{c?.desc}</p>
           <span className="challenge-page-prize">PRIZE: N{c?.prize}</span>
        </div>
         
      ))}
       
    
      </div>
      
      
      
    </div>
  );
};

export default ChallengePage;