// import "./challengeItem.scss";
// import {
//   PlayArrow,
//   Add,
//   ThumbUpAltOutlined,
//   ThumbDownOutlined,
// } from "@material-ui/icons";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function ListItem({ index, item }) {
//   const [challenges, setChallenges] = useState({});

//   //get movies
//   useEffect(() => {
//     const getChallenges = async () => {
//       try{
//         const res = await axios.get('http://localhost:4000/api/challenges/find/' + item, {
//           headers: {
//             token:
//             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//           },
//         });
//         // console.log(res)
//         setChallenges(res.data)
//       }catch(err){
//         console.log(err);
//       }
//     };
//     getChallenges();
//   }, [item])
//   console.log(challenges);
  
//   return (
//       <div className="challengeItem">
//        <img
//         src={challenges?.img}
//         alt=""
//         className="challenge-img"
//         />
//           {/* <video autoPlay={false} loop /> */}
//       <div className="challenge-title">{challenges?.title} </div>
//       <div className="challenge-desc">{challenges?.desc}</div>
//       <Link to="/newproduct">
//       <button className="challenge-btn">Create Video</button>
//       </Link>
      
//         </div>
    
    
//   );
// }