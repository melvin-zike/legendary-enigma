import React from 'react';
import "./weeklychallengeitem.scss";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef} from "react";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { MusicNote,  Add, Remove,  ThumbUp, BugReportTwoTone, Visibility, } from "@material-ui/icons";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';

const WeeklyChallengeItem = ({item, user}) => {
    const [playing, setPlaying] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const videoRef2 = useRef(null);
    const { user: currentUser } = useContext(AuthContext);
    const [challenges, setChallenges] = useState({});
    const [credits, setCredits] = useState(5);
    const [amount, setAmount] = useState(10);
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    //  check votes 
  useEffect(() => {
    setCredits(challenges?.credit);
  }, [challenges?.credit]);

    //get movies
    useEffect(() => {
      const getChallenges = async () => {
        try{
          const res = await axiosInstance.get('http://localhost:4000/api/movies/find/' + item, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          });
          // console.log(res)
          setChallenges(res.data)
        }catch(err){
          console.log(err);
        }
      };
      getChallenges();
    }, [item])
    console.log(challenges);


    //Votes Handler------------------------------------
  const handleClick = async (type) => {
    const credent = {
      postId: challenges?._id,
      userId: currentUser?._id,
      amount: amount,
    }
      const id = challenges?.userId;
    try {
        const res = await axiosInstance.put(`/movies/${id}/credit`, credent, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
          },
        });
          // setCredits(credits + 1);
          console.log(res);
          // setIsVoted(true);

          // socket?.emit("sendNotification", {
          //   senderName:currentUser?.username,
          //   receiverName: post?.username,
          //   type
          // })
    } catch (err) {
      console.log(err);
    }
  };

  //Payment
  const config = {
    email: currentUser?.email,
    amount: 100 * 100 * amount,
    reference: (new Date()).getTime().toString(),
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    
};

const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    handleClick(1)
};

const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
          <ThumbUp className="videosidebaricon"
               onClick ={()=> {
                initializePayment(onSuccess, onClose)
               }}/>
        </div>
    );

   
};


const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess,
    onClose
};

  // const handleView = (type) => {
  //   socket?.emit("sendNotification", {
  //     senderName:currentUser?.username,
  //     receiverName: post?.username,
  //     type
  //   })
  // }

    const onVideoPress = (e) => {
      e.preventDefault()
      if(playing){
        videoRef2.current.pause();
        setPlaying(false);
      }else{
        videoRef2.current.play();
        setPlaying(true);
      }
        }

        const AddAmount = () => {
          setAmount(amount + 1);
        }
        const RemoveAmount = () => {
          if(amount == 1){
            setAmount(1);
          }else{
            setAmount(amount - 1);
          }
          
        }

  return (
      <>
       {
              challenges?.isChallenge==true ? (
     <div className="challenge-post">
             <div className="challenge-post-container">
               <video src={challenges?.video} 
               className="weekly-challenge-video"
            
               controls
               onClick={()=>onVideoPress}
               ref={videoRef2}
               />
             </div>
            <div className="challenge-info-container">
             
               <MusicNote className='music-note-challenge' />
                 
                 <div className="challengeInfo">
                     <span className="challengeInfoChanel">{challenges?.username}</span>
                     <span className="challengeInfoTitle">{challenges?.title}</span>
                     <span className="challengeInfoTitle">{challenges?.desc}</span>
                     <span className="challengeInfoDetails">{credits} votes</span>
                     <div className="amount-votes">
                     <div className="challengeInfoDetails">
                       <Remove onClick={RemoveAmount}/>
                       <span className='votes-amount'>{amount}</span>
                       <Add onClick={AddAmount}/>
                     </div>
                     <span className="challengeInfoDetails"><PaystackHookExample/></span>
                     
                     </div>
                     
                 </div>
            </div>
             
      </div>
               ):(
                ""
            )
        }
      
      
      </>
      
  )
};

export default WeeklyChallengeItem;
