import { useContext, useEffect, useState, Suspense, lazy } from "react";
import "./App.css";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useHistory } from "react-router-dom";
import Paystack from "./usersapp/components/Paystack";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Patron from "./userpages/pages/patron/Patron";
import SuspenseFallback from "./userpages/pages/suspensefallback/SuspenseFallback";
import ResetPassword from "./userpages/pages/resetpassword/ResetPassword"
import ForgotPassword from "./userpages/pages/forgot-password/ForgotPassword";
import AboutUs from "./userpages/pages/about-us/AboutUs";
import Activation from "./userpages/pages/activation/Activation";
import TandC from "./userpages/pages/terms-conditions/TermsCondition";
import PrivacyPolicy from "./userpages/pages/privacy-policy/PrivacyPolicy";
import PagenotFound from "./userpages/pages/pagenotfound/PagenotFound";
import CommentPage from "./usersapp/components/commentpage/CommentPage";
import Register from "./userpages/pages/register/Register"
import Edit from "./userpages/pages/edit/Edit"
import Topbar from "./usersapp/components/topbar/Topbar";
import FanDonate from "./usersapp/components/fanDonate/FanDonate";
// import {io} from "socket.io-client";
//Pages
import Login from "./pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import { AuthContext } from './context/authContext/AuthContext';
const UserHome = lazy(() => import("./userpages/pages/home/Home"));
const Playground = lazy(() => import("./usersapp/components/playground/Playground"));
const Profile = lazy(() => import("./userpages/pages/profile/Profile"));
const ChallengePage = lazy(() => import("./userpages/pages/challenge/ChallengePage"));
const WeeklyChallenge = lazy(() => import("./usersapp/components/weeklyChallenge/WeeklyChallenge"));


function App() {
  const { user } = useContext(AuthContext);
  // const [socket, setSocket] = useState(null);
  const history = useHistory();
  let currentDate = new Date().getTime();

useEffect(()=> {  
    if(user === null){
       history?.push("/login");
    }else{   
      const decodedToken = jwt_decode(user?.accessToken);
      if(decodedToken.exp *1000 < currentDate){    
    localStorage.setItem("user", null);
    window.location.reload();    
   }
   
    }
    
   
  }, [currentDate, user]);

  
  //  // CONNET SOCKET
  //  useEffect(()=> {
  //   setSocket(io("http://localhost:8080")); 
  //   console.log(socket?.on("firstEvent", (msg) => {
  //     console.log(msg); 
  //   }))
  // }, []);

  // //send event to socket server
  // useEffect(()=> {
  //   socket?.emit("newUser", user?.username);
  // }, [socket, user?.username]);

  

 
  return (
    <Router>
         
         <Suspense fallback ={<SuspenseFallback />}> 
         <div className="appbackground">
         <Topbar />
         <Switch>
         <Route path="/login">
         {user ? <Redirect to="/" /> : <Login />}  
         </Route>
         <Route path="/patron-page">
         <Patron />  
         </Route>
         <Route path="/activate/:token">
         <Activation />  
         </Route>
         <Route path="/resetpassword/:token">
         <ResetPassword />  
         </Route>
         <Route path="/forgot-passord">
         <ForgotPassword />  
         </Route>
         <Route path="/playground">
         {!user ? <Login /> :<UserHome type="challenge"/>}
         </Route>
         <Route path="/edit-page">
         {!user ? <Redirect to="/login" /> : <Edit /> }
         </Route>
         <Route path="/weekly-challenge">
         {!user ? <Redirect to="/login"/> : <WeeklyChallenge  type="challenge" />}
         </Route>
         <Route path="/donate">
         <Paystack />
         </Route>
         <Route path="/terms-conditions">
         <TandC />
         </Route>
         <Route path="/privacy-policy">
         <PrivacyPolicy />
         </Route>
         <Route path="/about-us">
         <AboutUs />
         </Route>
         <Route exact path="/">
         {!user ? <Redirect to="/login" />  : <Playground type="challenge" />  }
         </Route>
        
         <Route path="/register">
         <Register />
         </Route>
         <Route exact path="/post/:postId">
         {!user ? <Redirect to="/login" /> : <CommentPage />}
         </Route>
         <Route exact path="/give/:userId">
         {!user ? <Redirect to="/login" /> : <FanDonate />}
         </Route>
         <Route path="/profile/:username">
          {!user ? <Redirect to="/login" /> : <Profile />}
         
       </Route>
         <Route path="/challenge-page">
         {user?.isFan ? <Redirect to="/" /> :  <ChallengePage/> }
           
         </Route>
         <Route path="/newproduct">
         {!user ? <Redirect to="/login" /> : <NewProduct /> }
         </Route>
     
         <Route component={PagenotFound} />
         
     
     </Switch>
         </div>
       
      </Suspense>
    </Router>
  );
}

export default App;