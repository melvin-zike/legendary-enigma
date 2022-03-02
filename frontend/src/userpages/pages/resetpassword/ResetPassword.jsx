import { useState,  useRef } from "react";
import axios from "axios";
import "./resetpassword.scss";
import {useParams} from "react-router-dom";
import { useHistory } from "react-router";

const ResetPassword = () => {
    const {token} = useParams();
    const [msg, setMsg ] = useState("");
    const history = useHistory();
    const password = useRef();
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value === "") {
          password.current.setCustomValidity("Fill in n new password!");
        } else {
          const body = {
            resetLink: token,
            newPass: password.current.value,
            // desc: desc.current.value,
          };
          try {
            const res = await axiosInstance.put("/auth/reset-password", body);
            console.log(body);
            console.log(res.data);
            setMsg(res.data.message);
            if(res.status === 200){
              setTimeout(() => {
                history.push("/login");
              }, 4000);
            }
            
          } catch (err) {
            console.log(err);
          }
        }
      };



    return (
        <div className="reset-container">
             <p className="success-message">{msg}</p>
            <form className="resetPass" onSubmit={handleClick}>
            <label className="formlabels">Enter New Password</label>
            <input
              type="password"
              placeholder="new Password"
              required
              ref={password}
              className="resetInput"
            //   pattern = "^[A-Za-z0-9]{3,16}$"
            />
            <button className="reset-btn">
                Reset Your Password
            </button>
        </form> 
         </div>
    )
}

export default ResetPassword
