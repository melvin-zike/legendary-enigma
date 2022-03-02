import { useRef, useState } from "react";
import "./forgotpassword.scss";
import axios from "axios";

const ForgotPassword = () => {
    const [msg, setMsg ] = useState("");
    const [errMsg, setErrMsg ] = useState("");
    const email = useRef();
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    const handleClick = async (e) => {
        e.preventDefault();
        if (email.current.value === "") {
          email.current.setCustomValidity("Fill in n new password!");
        } else {
          const body = {
            email: email.current.value,
          };
          try {
            const res = await axiosInstance.put("/auth/forgot-password", body);
            console.log(body);
            console.log(res.data);
              setMsg(res.data.message);
            // history.push("/login");
          } catch (err) {
            console.log(err.message);
            setErrMsg(err.message);
          }
        }
      };

    return (
        <div className="forgot-container">
            <form className="forgotBox" onSubmit={handleClick}>
          
            <p className="forgot-alert">{msg}</p>
            <p className="error-alert">{errMsg}</p>
            <label className="forgot-text">Insert Your Email To Reset Your Password</label>
            <input
              placeholder="Email"
              required
              ref={email}
              className="forgotInput"
              type="email"
            />
           <button className="forgotbtn">Submit</button>
          </form>
        </div>
    )
}

export default ForgotPassword
