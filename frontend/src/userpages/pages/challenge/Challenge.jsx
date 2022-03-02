import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { useRef, useState } from "react";
  import "./challenge.scss";
  import ChallengeItem from "./ChallengeItem"


  
  export default function Challenge({challenge}) {
    return (
      <div className="challenge-list">
        <span className="challenge-listTitle">Hello</span>
        <div className="challenge-wrapper">
          <div className="challenge-container">
           
            {/* {list.content.map((item, i) => (
               <ChallengeItem index={i} item={item} />
            )) } */}
          </div>
          
        </div>
      </div>
    );
  }