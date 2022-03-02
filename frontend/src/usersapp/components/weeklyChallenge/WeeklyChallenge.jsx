import React from 'react'
import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import WeeklyChallengeList from './WeeklyChallengeList';
import { AuthContext } from '../../../context/authContext/AuthContext';
import Ticker from "react-ticker"

import "./weeklychallenge.scss";

const WeeklyChallenge = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axiosInstance.get(`http://localhost:4000/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : "" }`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
        // console.log(res)
        setLists(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  }, [type, genre])
  
      
    return (
        <div className="weekly-challenge-page">
          {user ? <Sidebar /> : <div className='listings'></div>}
          
          <div className="challenge-weekly">
          <Ticker className='ticker-container' mode="smooth">
               {({ index }) => (
                 <>
                 <p className='challenge-ticker'>Vote your favorite Mictok Upcoming artist... </p>
                 </>
               )

               }
             </Ticker>
             {lists.map((list, index) => (  
        <WeeklyChallengeList  key={index} list={list}/>
      ))}
           
          </div>

        </div>
          
    )
}

export default WeeklyChallenge
