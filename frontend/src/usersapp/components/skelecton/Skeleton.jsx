import { CircularProgress } from '@material-ui/core'
import React from 'react'
import "./skeleton.scss";

const Skeleton = ({type}) => {
    const COUNTER = 8;

        const CircleSk = () => (
        <div className="circlesk">
            <CircularProgress />
        </div>
        );
        
        const PostSk = () => (
        <div className="sksk">
            
       <div className="skTop">
          <div className="skTopLeft">
            
            <span className="skUsername"><h3></h3></span>
            <span className="skDate"></span>
          </div>
          <div className="skTopRight">
            
          </div>
          
        </div>
        
        <div className="skdesc"></div>
      <div className="skWrapper">
         <button className="donate-btn"></button>
        <div className="skCenter">
          
        <div class="sk">
        <sk
        className="sk-player"

      />
          <div className="skfooter">
            <div className="skFooter_text">
                <h3></h3>
                <p></p>
                <div className="sk_ticker">
                
                
                </div>
                
            </div>

            <img className="sk-logo" src="" alt=""/>
        </div>
        
       
        <div className="skSidebar">
              <div className ="skSidebar_button">
                  
                  
                  <p></p>
              </div>
              <div className ="skSidebar_button">
                  
              </div>
              <div className ="skSidebar_button">
                  
                  <p></p>
              </div>
            </div>
        </div> 
        
        </div>
        <div className="hLine">
        </div>
        
      </div>
      
    </div>
    
        );
        const VoteSk = () => (
        <div className="votesk">
            <div></div>
        </div>
        );
        const CustomSk = () => (
        <div className="custom">
            <div className="balls">
                <div className="ball ball1"></div>
                <div className="ball ball2"></div>
                <div className="ball ball3"></div>
                
            </div>
            <span className="customText">Loading...</span>
        </div>
        );

    if(type === "vote") return Array(COUNTER).fill(<VoteSk />);
    if(type === "circle") return (<CircleSk />);
    if(type === "post") return Array(COUNTER).fill(<PostSk />);
    if(type === "custom") return (<CustomSk />);
    
}

export default Skeleton
