import { useEffect, useState } from "react";
import "./featured.scss";
import axios from "axios";
import Slider from "./Slider";



const Featured = ({type}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [content, setContent ] = useState({});
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
    

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
  }, [type])

    return (
          <div className="featured">
              <div className='front-banner-img'>
                <div className="featured-banner">
                <Slider />
                </div>
                {/* <img
                className="featured-img"
                src={PF + "profile/about-banner.jpg" }
                alt=""
                /> */}
               
                <div className='side-banner'>
                <img
                className="featured-side-img"
                 src={content?.img}
                alt=""
              />
                </div>
              </div>
    
              {/* <div className="featured-banner-text">
                <h3 className="featured-banner-inner-text">Feel The Sound Code...</h3>
                <h2 className="featured-banner-inner-text">We Empower Up and Coming Musicians </h2>
                <p className="featured-banner-inner-text">With a litte donation you can make someone's dream come true</p>
                <button className="featured-about-donate">BECOME A PATRON</button>
              </div> */}

             
         
          </div>
        
    )
}

export default Featured;
