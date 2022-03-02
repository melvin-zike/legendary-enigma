import { useState } from "react";
import axios from "axios";
import "./activate.scss";
import {useParams} from "react-router-dom";

const Activation = () => {
    const {token} = useParams();
    const [msg, setMsg ] = useState("");
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
   
    const activate = async () => {
      try {
        const res = await axiosInstance.post("/auth/email-activation", {token});
        console.log(token)
        setMsg(res.data.message);
        // history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
    return (
        <div className="activate-container">
             <p className="succes-message">{msg}</p>
            <div className="activation">
            <button className="activate" onClick={activate}>
                Activate Your Account
            </button>
        </div> 
         </div>
        
    )
}

export default Activation
