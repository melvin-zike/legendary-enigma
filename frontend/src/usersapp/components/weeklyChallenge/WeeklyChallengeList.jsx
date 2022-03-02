import React from 'react'
import './weeklychallengelist.scss';
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import LazyLoad from "react-lazyload";
import Skeleton from "../skelecton/Skeleton";
import { AuthContext } from '../../../context/authContext/AuthContext';

import WeeklyChallengeItem from './WeeklyChallengeItem';


const WeeklyChallengeList = ({ challengeuser, list}) => {
    // const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const { user } = useContext(AuthContext);
  
    // const Loading = () => (
    //   <div>
    //     <h5>Loading....</h5>
    //   </div>
    // )
  
  
          // useEffect(() => {
          //   const fetchPosts = async () => {
             
          //     try{
          //       setIsLoading(true);
          //       const res = username ?
          //       await axios.get("/movies/profile/" + username, {
          //         headers: {
          //           token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          //         },
          //       })
          //       : await axios.get("/movies/", {
          //         headers: {
          //           token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          //         },
          //       });
          //       console.log(res.data)
          //       setIsLoading(false);
          //       if(res.status === 200){
          //         setPosts(
          //           res.data.sort((p1, p2) => {
          //             return p2.votes.length - p1.votes.length;
          //           })
            
          //         );
          //       }else{
          //         // nopost.style.display = "block";
          //       }
              
          //     }catch(err){
          //       console.log(err);
          //     }
              
          //   };
          //   fetchPosts();
          // }, [username, user?._id]);
        
    
    
    return (
        <div className='ischallenge'>
          

              <div className="weekly-challenge-list">
                 {/* {isLoading ? (
                    <div className="featured"> <Skeleton type="custom"/> </div> ) :
                    (   */}
                <div className="challengeWrapper"> 
           
                {list.content.map((item, i) => (
                    <div key={i}>
                        <WeeklyChallengeItem index={i} item={item} user={challengeuser}/>
                    </div>
                   
                 )) }

                 </div>
              {/* )} */}
          </div>
        </div>
    )
}

export default WeeklyChallengeList


// <LazyLoad 
// key={p._id} 
// height={100}
// offset={[-100, 100]}
// placeholder={<Loading classaname="lazyloading"
// />}>
// </LazyLoad>