import React from 'react'
import { CardGiftcard } from '@material-ui/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import "./ads.scss"
import Ticker from "react-ticker"
import Slider from '../featured/Slider';

const Ads = ({type}) => {

  const [content, setContent ] = useState({});
  const [ads, setAds ] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
    
 //random content from challeng
  useEffect(() => {
    const getRandomContent = async () => {
      try{
        const res = await axiosInstance.get(`/challenges/random?type=${type}`,{
          headers: {
            token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent();
  }, [type]);

 //random ad from challeng
  useEffect(() => {
    const getRandomAds = async () => {
      try{
        const res = await axiosInstance.get(`/ads/random`,{
          headers: {
            token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setAds(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getRandomAds();
  }, [type]);

    return (
        <div className="ads">
          <div className="ads-wrapper">
            <div className="adshome">
             <Ticker className="ticker" mode="smooth">
                  {({ index }) => (
                    <div className="birthdayContainer">
                    < CardGiftcard className="birthdayImg" alt="" />
                    <span className="birthdayText">
                      <b>Reccommend</b> An Artist for <b> Sponsorship. Help</b> bring them closer to their<b> dreams</b>.
                    </span>
                  </div>
                  )

                  }
          </Ticker>
             <div className='ads-banner'>
                <img
                className="mainads"
                 src={content?.img}
                alt=""
              />
              <h5>Join The <b> {content?.title}</b></h5>
              <span>Prize: <b> ₦{content?.prize}</b></span>
                </div>
        
        
          </div>
            <div className="adshome2">
            
           <img className="mainads2" src={ads?.img} alt="" />
        
        
          </div>
         </div>
        </div>
    )
}

export default Ads
