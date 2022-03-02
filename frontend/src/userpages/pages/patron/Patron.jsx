import { CardGiftcard, Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import React from 'react';
import { Link } from "react-router-dom";
import "./patron.scss";



const Patron = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="patron-page">
              <div>
                <img
                className="patron-img"
                src={PF + "profile/about-banner.jpg" }
                alt=""
                />
              </div>
    
              <div className="banner-text">
                <h1 className="patron-banner-inner-text1">BECOME A MICTOKK PATRON TODAY...</h1>
                <h3 className="patron-banner-inner-text">Find An Upcoming Artist worth sponsoring or donating to...</h3>
                <h2 className="patron-banner-inner-text">We Empower Up and Coming Musicians With Cash Prices And Sponsorships</h2>          
              </div>
              
              <div className="patron-gist">
                <div className="patron-gist-text">
                  <h2 className="patron-gist-text-text">Welcome To Mictokk</h2>
                  <p>We love and cherish our patrons</p>
                </div> 
                <div className="patron-gist-member">
                  <h1 className="patron-gist-text-text">Select A Patronship Packages</h1>
                  <p className="patron-gist-text-p"> <CardGiftcard className="patron-gift"/> Get exclusive access to our events, decision making, artist discovery and branding journey...</p>
                </div> 
              </div>

             <div className="patronship">
             <div className="patron-package">
            
            <div className="patron-1">
                <p className="patron-1-p"><b>Artists Patron</b></p>
                <h2 className="patron-1-h2">Any Amount</h2>
                <p className="patron-1-p2">Anytime...</p>

                <Link to="donate">
                <button className="patron-1-p-btn">Donate & Register</button>
                </Link>

                <div className="patron-benefits">
                <p className="patron-benefits-p">For donating you will...</p>
                        <h4>-Have Our Sincere Gratitude </h4>
                        <h4>-Be part of making and spoting out Africas' next big artist</h4>
                        <h4>-Be A part of all our events and decision on which artists <br />deserve donations and sponsorship</h4>
                        <h4>-Most of all, You Be helping someone realize their dream.</h4>
                    
                </div>
                
            </div>
            <div className="patron-2">
            <p className="patron-1-p">Supporter Patron</p>
                <h2 className="patron-1-h2">₦100k+</h2>
                <p className="patron-1-p2">Anytime/Per Month</p>
                <Link to="donate">
                <button className="patron-1-p-btn">Donate & Register</button>
                </Link>
                

                <div className="patron-benefits">
                <p className="patron-benefits-p">For donating you will...</p>
                        <h4>-Have Our Sincere Gratitude </h4>
                        <h4>-Be part of making and spoting out Africas' next big artist</h4>
                        <h4>-Be A part of all our events and decision on which artists <br />deserve donations and sponsorship</h4>
                        <h4>-Most of all, You Be helping someone realize their dream.</h4>
                    
                </div>
            </div>
            <div className="patron-3">
            <p className="patron-1-p">Grand Patron</p>
                <h2 className="patron-1-h2">₦1m+</h2>
                <p className="patron-1-p2">1st Time donation, any amount afterwards</p>

                <Link to="donate">
                <button className="patron-1-p-btn">Donate & Register</button>
                </Link>
                <div className="patron-benefits">
                <p className="patron-benefits-p">For donating you will...</p>
                        <h4>-Have Our Sincere Gratitude </h4>
                        <h4>-Be part of making and spoting out Africas' next big artist</h4>
                        <h4>-Be A part of all our events and decision on which artists <br />deserve donations and sponsorship</h4>
                        <h4>-Most of all, You Be helping someone realize their dream.</h4>
                    
                </div>
            </div>
           
          </div>


          
             </div>
              
             <div className="current-patrons">
                <span  className="current-patrons-span1">Monthly Patrons:</span>
                <span className="current-patrons-span">13+</span>
                <span  className="current-patrons-span1">Monthly Goal:</span>
                <span className="current-patrons-span">₦5M</span>
                <span  className="current-patrons-span1">Reach:</span>
                <span className="current-patrons-span">20%</span>
                 <div>
                 <span className="current-patrons-span"><Instagram /></span>
                <span className="current-patrons-span"><Facebook /></span>
                <span className="current-patrons-span"><Twitter /></span>
                <span className="current-patrons-span"><LinkedIn /></span>
                 </div>
                
          </div>
          </div>
    )
}

export default Patron
