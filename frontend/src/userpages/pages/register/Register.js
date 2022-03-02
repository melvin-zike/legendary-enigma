import axios from "axios";
import { useRef, useState } from "react";
import "./register.scss";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
// import AnimatedShapes from "../AnimatedShapes";


export default function Register() {
  const [msg, setMsg ] = useState("");
  const [erro, setErro ] = useState("");
  const [focused, setHandleFocused] = useState(false);
  const [focused1, setHandleFocused1] = useState(false);
  const [focused2, setHandleFocused2] = useState(false);
  const [focused3, setHandleFocused3] = useState(false);
  const [focused5, setHandleFocused5] = useState(false);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
  const username = useRef();
  const email = useRef();
  const isFan = useRef();
  const password = useRef();
  const phone = useRef();
  const sponsorship = useRef();
  const state = useRef();
  const firstname = useRef();
  const lastname = useRef();
  // const password2 = useRef();
  // const desc = useRef();
  const passwordAgain = useRef();
  // const passwordAgain2 = useRef();
  // const history = useHistory();
  const isAfan = true;
  

  const handleFocus = (e) => {
    e.preventDefault()
    setHandleFocused(true);
  }
  const handleFocus1 = (e) => {
    e.preventDefault()
    setHandleFocused1(true);
  }
  const handleFocus2 = (e) => {
    e.preventDefault()
    setHandleFocused2(true);
  }
  const handleFocus3 = (e) => {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      setHandleFocused3(true);
    }
    
  }
  const handleFocus5 = (e) => {
    e.preventDefault()
      setHandleFocused5(true);
    
  }
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const body = {
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        username: username.current.value,
        email: email.current.value,
        isFan: isFan.current.value,
        phone: phone.current.value,
        state: state.current.value,
        sponsorship: sponsorship.current.value,
        password: password.current.value,
        // desc: desc.current.value,
      };
      try {
        const res = await axiosInstance.post("/auth/register", body);
        console.log(body);
        if(res.status == 200){
          console.log(res.data);
          setMsg(res.data.message);
          // history.push("/login");
        }
       
      } catch (err) {
        if(err.response?.status == 400)
        setErro("username or email already exists");
        setTimeout(() => {
          setErro("");
        }, 3000);
      }
    }
  };

  // const handleClick2 = async (e) => {
  //   e.preventDefault();
    
  //   if (passwordAgain2.current.value !== password2.current.value) {
  //     passwordAgain2.current.setCustomValidity("Passwords don't match!");
  //   } else {
  //     const user = {
  //       username: username.current.value,
  //       email: email.current.value,
  //       password2: password.current.value,
  //       isFan: isAfan
  //     };
  //     try {
  //       await axios.post("/auth/register", user);
  //       history.push("/login");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <div className="register">
      <div className="registerWrapper">
      {/* <h3 className="loginLogo">Feel The sound code...</h3> */}
          
        <div className="registerRight">
          
          <form className="registerBox" onSubmit={handleClick}>
          <h2 className="msg-info">Sign Up As An Artist</h2>
          
          <p className="success">{msg}</p>
          <p className="dangerous">{erro}</p>
          <label className="formlabels">First Name</label>
            <input
              placeholder="Username"
              required
              ref={firstname}
              className="registerInput"
              pattern = "^[A-Za-z0-9]{3,16}$"
              onBlur={handleFocus}
              focused={focused.toString()}
            />
            <p className="errorMessage">First name should be atleast 3-16 characters and shouldnt include any special characters!</p>
          <label className="formlabels">Last Name</label>
            <input
              placeholder="Last Name"
              required
              ref={lastname}
              className="registerInput"
              pattern = "^[A-Za-z0-9]{3,16}$"
              onBlur={handleFocus}
              focused={focused.toString()}
            />
            <p className="errorMessage">Last name should be atleast 3-16 characters and shouldnt include any special characters!</p>
          <label className="formlabels">Username</label>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
              pattern = "^[A-Za-z0-9]{3,16}$"
              onBlur={handleFocus}
              focused={focused.toString()}
            />
            <p className="errorMessage">Username should be atleast 3-16 characters and shouldnt include any special characters!</p>
            <label className="formlabels">Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              ref={email}
              // pattern ="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
              className="emailInput"
              onBlur={handleFocus1}
              focused1={focused1.toString()}
            />
            <p className="errorMessage1">It should be a valid email</p>
            <label className="formlabels">Number</label>
            <input
              type="number"
              placeholder="2348100000000"
              pattern="/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im"
              required
              ref={phone}
              className="emailInput"
              id="phoneInput"
              onBlur={handleFocus5}
              focused5={focused5.toString()}
            />
            <p className="errorMessage5">It should be a valid phone</p>
            <label className="formlabels">Are you an Artist or a fan</label>
      
            <select ref={isFan} className="emailInput" required>
            <option value="false">Artist</option>
            <option value="true">Fan</option>
            </select>
            <label className="formlabels">Sponsorship Package</label>
      
            <select ref={sponsorship} className="emailInput" required>
              <option value="1">General Career Sponsorship</option>
              <option value="2">Free music production</option>
              <option value="3">Record Deal</option>
              <option value="4">to Sponsor An Arist(For Fans)</option>
              </select>
            <label className="formlabels">Location</label>
            <select ref={state} className="emailInput" required>
              <option value="Abuja">Abuja</option>
              <option value="Anambra">Anambra</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Bayelsa">Bayeslsa</option>
              <option value="Calaba">Calaba</option>
              <option value="Delta">Delta</option>
              <option value="Edo">Edo</option>
              <option value="Imo">Imo</option>
              <option value="Jos">Jos</option>
              <option value="Lagos">Lagos</option>
              <option value="Ogun">Ogun</option>
              <option value="Rivers">Rivers</option>
              
              
              </select>
            
            {/* <label className="formlabels">Say Alitte about you</label>
            <textarea
              placeholder="Pitch your self"
              required
              ref={desc}
              className="loginInput"
              type="text"
            ></textarea> */}
            
          {/* <label>Country</label>
          <select name="isSeries" id="isSeries" className="registerCountry">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <label>State</label>
          <select name="isSeries" id="isSeries" className="registerCountry">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select> */}
       
            <label className="formlabels">Password</label>
            <input
              placeholder="Password"
              required
              ref={password}
              className="passwordInput"
              type="password"
              pattern = '^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,16}$'
              onBlur={handleFocus2}
              focused2={focused2.toString()}
            />
            <p className="errorMessage2">Password should be 8-16 characters include atleast 1 letter, 1 number and 1 special character</p>
            <label className="formlabels">Confirm Password</label>
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="password2Input"
              type="password"
              onBlur={handleFocus3}
              // onFocus={(e) => setHandleFocused3(true)}
              focused3={focused3.toString()}
            />
             <p className="errorMessage3">Password do not match</p>
            <div className="terms">
            <input
              placeholder="Terms"
              required
              // ref={}
              className=""
              type="checkbox"
            />
            <Link to="/terms-conditions"><span>T&C</span></Link>
            </div>
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="registerForgotlinks">
            <span className="registerForgot">Already have an account? Sign In</span>
            </Link>
          </form>
          
        </div>
        </div>
      {/* FAN REGISTRATION FORM -------------------------------------------------------------------------- */}
      <div className="registerWrapper2">
         <span className="registerDesc">
            <p>Mictok is A video Sharing Platform Where Upcoming Artist.. </p>
            <p>Show Their Musical Talents, connect with fans and Potential Sponsors around the world.</p>
          </span>
          <div className="registerLeft">
          <video src="" className="register-logo" />
        
          {/* <AnimatedShapes /> */}
          {/* <form className="loginBox2" onSubmit={handleClick2}>
          <h2 class="msg-info">Register As A Fan</h2>
          <label className="formlabels">Your Name</label>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <label className="formlabels">Email</label>
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <label className="formlabels">Password</label>
            <input
              placeholder="Password"
              required
              ref={password2}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <label className="formlabels">Confirm Password</label>
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain2}
              className="loginInput"
              type="password"
            />
            <div className="terms">
            <input
              placeholder="Terms"
              required
              // ref={}
              className=""
              type="checkbox"
            />
            <Link to="/terms-conditions"><span>I agree to the terms and conditions</span></Link>
            </div>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
            <span className="loginForgot">Already have an account? Sign In</span>
            </Link>
          </form> */}
        </div>
        </div>
    </div>
  );
}