import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.scss";
import LazyLoad from "react-lazyload";
import Skeleton from "../skelecton/Skeleton";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';


export default function Feed({ username, socket }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  const Loading = () => (
    <div>
      <h5>Loading....</h5>
    </div>
  )


  useEffect(() => {
    const fetchPosts = async () => {
     
      try{
        setIsLoading(true);
        const res = username ?
        await axiosInstance.get("/movies/profile/" + username, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        : await axiosInstance.get("/movies/", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        
        setIsLoading(false);
        if(res.status === 200){
          setPosts(
            res.data.sort((p1, p2) => {
              return p2.votes.length - p1.votes.length;
            })
    
          );
        }else{
          // nopost.style.display = "block";
        }
      
      }catch(err){
        console.log(err);
      }
      
    };
    fetchPosts();
  }, [username, user?._id]);

  return (
    <div className="feed">
       {isLoading ? (
        <div className="featured"> <Skeleton type="custom"/> </div> ) :
      (  
      <div className="feedWrapper">
        {posts.map((p) => (
          <LazyLoad 
          key={p._id} 
          height={100}
          offset={[-100, 100]}
          placeholder={<Loading classaname="lazyloading"
           />}>
            <Post socket={socket} key={p._id} post={p} />
          </LazyLoad>
          
        ))
        
        }
        
      </div>
      )}
    </div>
  );
}