import { useContext, useRef, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import "./fandonate.scss";
import axios from "axios";
import { AuthContext } from '../../../context/authContext/AuthContext';


function FanDonate() {
    const location = useLocation();
    const [amount, setAmount ] = useState("");
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const total = amount * 0.7;
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });

    //Votes Handler------------------------------------
  const handleGive = async () => {
    const credent = {
      amount: total,
      userId: user?._id,
    }
      const id = location.post?.userId;
    try {
        const res = await axiosInstance.put(`/users/${id}/donation`, credent, {
 
          headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }, 
        });
      
      history.push("/playground");
    } catch (err) {
    }
  };

    

    const config = {
        email: user?.email,
        amount: amount * 100,
        reference: (new Date()).getTime().toString(),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
       
    };
    
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        handleGive();
    };
    
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    
    const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <div>
                <button className="donate-button" onClick={() => {
                    initializePayment(onSuccess, onClose)
                }}>DONATE</button>
            </div>
        );

        // sendDescription();
    };

    // const sendDescription = () => {

    // }

    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess,
        onClose
    };

  return (
    <div className="give-container">
        <h2 className="give-text">A LITTLE DONATION FROM YOU COULD HELP SPONSOR AN UPCOMING ARTIST'S DREAM</h2>

        <div className="give-card">
        <input type="number" placeholder="Amount" className="donate-input" onChange={(e) => setAmount(e.target.value)}/>
        <PaystackHookExample />
        </div>
        
        <h2 className="donate-text" onClick={handleGive}>Thank You For Donating!</h2>

        <h5 className="donate-text">
            Or Make A transfer To account: 5400235955
            name: Radulam networks : bank: Providus Bank
        </h5> 
       
        {/* <PaystackButton {...componentProps} /> */}
        {/* <PaystackConsumer {...componentProps} >
            {({initializePayment}) => <button onClick={() => initializePayment()}>Paystack Consumer Implementation</button>}
        </PaystackConsumer> */}
    </div>
  );
}

export default FanDonate;