import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import { useContext, useEffect, useState, useRef } from "react";
import useAudio from "../sounds/useAudio";
import Picker from "emoji-picker-react";
import sound from "../sounds/client_src_utils_sound.mp3";
import "./fanchat.scss";
import { AuthContext } from '../../../context/authContext/AuthContext';
import { format } from "timeago.js";
import { InsertEmoticon } from '@material-ui/icons';

const Chats = ({socket, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showPicker, setShowPicker ]=useState(false);   
     const audio = useAudio(sound);
    const { user } = useContext(AuthContext);


    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: user?.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket?.emit("send_message", messageData);
            // try{
            //     const res = await axios.post('/messages', message, {
            //         headers: {
            //           token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            //         },
            //       });
            //     setMessageList((list) => [...list, res.data]);
            //     setCurrentMessage("");
            //   }catch(err){
            //       console.log(err);
            //   }
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket?.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(data);
            if(user.username !== data.author) audio.play();
        })
    }, [socket])

    // Emoji logic
    const onEmojiClick =(event, emojiObject) => {
        setCurrentMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };

     





    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Fan Zone...</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
               {messageList.map((messageContent) => {
                   return <div className="message" id={user?.username === messageContent?.author ? "you" : "other"}>
                           
                            <div className="message-meta">
                                <p id="author">{messageContent?.author}</p>
                                <p id="time">{messageContent?.time}</p>
                            </div>
                            <div className="message-content">
                                <h6>{messageContent.message}</h6>
                            </div>
                       
                   </div>
                   
            })}
            {showPicker && <Picker className="picker" onEmojiClick={onEmojiClick}
               />}
            </ScrollToBottom>
            </div>
            <div className="chat-footer">
               
                <InsertEmoticon className="emoji-icon" onClick={() => setShowPicker(val => !val)} />
                <input type="text"
                 value={currentMessage}
                 placeholder="    Rep Your Fave" 
                 onChange={(e) => {setCurrentMessage(e.target.value)}}
                 onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                 }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            
        </div>
    )
}

export default Chats

