import { useContext, useRef, useState } from "react";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import "./paystack.scss";

function Paystack() {
    const [email, setEmail ] = useState("");
    const [amount, setAmount ] = useState("");
    
    
    const config = {
        email: email,
        amount: amount * 100,
        reference: (new Date()).getTime().toString(),
        publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    
    };
    
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
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
    <div className="paystack">
        <h2 className="donate-text">A LITTLE DONATION FROM YOU COULD HELP SPONSOR AN UPCOMING ARTIST'S DREAM</h2>

        <div className="donate-card">
        <input type="text" placeholder="Email" className="donate-input" onChange={(e) => setEmail(e.target.value)}/>
        <input type="number" placeholder="Amount" className="donate-input" onChange={(e) => setAmount(e.target.value)}/>
        <PaystackHookExample />
        </div>
        
        <h2 className="donate-text">Thank You Our Patrons!</h2> 
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

export default Paystack;