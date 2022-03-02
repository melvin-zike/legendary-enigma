import { useEffect, useState, useRef, Fragment } from "react";
import "./featured.scss";
import axios from "axios";

const colors = [ 
"https://www.creatopy.com/blog/wp-content/uploads/2016/06/Make-Google-Approve-Your-Banner-Ad-600x310.png", 
"https://www.creatopy.com/blog/wp-content/uploads/2016/06/images-for-banner-ads-1024x527.png"
];
const delay = 2500;

const Slider = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const [ads, setAds ] = useState([]);
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    useEffect(() => {
      const getAds = async () => {
        try{
          const res = await axiosInstance.get(`/ads`,{
            headers: {
              token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setAds(res.data);
        }catch(err){
          console.log(err);
        }
      }
      getAds();
    }, [])

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

      useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === ads.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [index]);
    
    

      return (
        <div className="featured-img">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {ads.map((ad, index) => (
             <a href={ad.link} key={index} target="_blank">
               {ad.isVideo == true ? 
                  <video
                  autoPlay
                  progress
                  loop
                  className="slide"
                  src={ad.video}
                  
                />   :

                <img
                className="slide"
                src={ad.img}
                
              />  
               }
               
             </a> 
                  
              
                 
            ))}
          </div>

          <div className="slideshowDots">
            {ads.map((_, idx) => (
              <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
              ></div>
            ))}
          </div>
        </div>
      );
};

export default Slider;



