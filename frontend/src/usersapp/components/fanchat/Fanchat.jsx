// import React from 'react'
// import { useContext, useEffect, useState, useRef } from "react";
// import Chats from './Chats';
// import "./fanchat.scss";
// import { AuthContext } from '../../../context/authContext/AuthContext';


// const Fanchat = ({socket}) => {
//     const { user } = useContext(AuthContext);
   
//     const [room, setRoom] = useState("General");
//     const [showChat, setShowChat] = useState(false);

//     const joinRoom = () => {
//         if(user){
//             socket?.emit("JoinRoom", room);
//             setShowChat("true");
//         }
//     }

//     return (
//         <div className="wrap">
//         {!showChat ?
//         <div className="joinChatContainer">
//         <h3 className="chat-header-text">Join Chat</h3>    
//         <button onClick={joinRoom}>Join Room</button>

//      </div>
//          :
//          <Chats socket={socket} username ={user?.username} room={room}/> 
//          }
//         </div>
//     )
// }

// export default Fanchat
