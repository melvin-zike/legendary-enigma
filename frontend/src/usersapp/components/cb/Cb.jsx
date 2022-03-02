import React from 'react'
import "./cb.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';


export default function Cb({creditOwner}) {
  const { user } = useContext(AuthContext);
  const [alertwithdraw, setAlertWithdraw] = useState(creditOwner._id);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  const handleWithdraw = async () => {
    if(user?.donation === 0 || user?.donation < 5000){
      setAlertWithdraw("insufficient funds...");
    }else{
      const credent = {
        username: user?.username,
        userId: user._id,
        amount: user?.donation,
      }
      try {
          const res = await axiosInstance.post(`/transaction`, credent, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
            },
          });
          setTimeout(() => {
            setAlertWithdraw("request processing...");
          }, 2000);
          setTimeout(() => {
            setAlertWithdraw("request sent!");
          }, 4000);
          
      } catch (err) {
        console.log(err);
      }
    }
    
  }

    return (
    <>
  <h4 className="rightbarTitle">User Credits</h4>      
  <div className="credit-card">
    <div className="creditnlogo">
    <div className="logo-card">Mictokk</div>
     
    </div>
  <div className="numbers">{alertwithdraw}</div>
  <div className="name-and-expiry">
    <span>{creditOwner.username}</span>
    <span><button className="rechargebtn" onClick={handleWithdraw}>Withdraw</button></span>
  </div>
</div>
  </>
    )
}
