import React from 'react'
import { Link } from "react-router-dom";
import { CardGiftcard, Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import "./aboutus.scss";

const AboutPage = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
          <div className="empower">
              <div>
                <img
                className="about-img"
                src={PF + "profile/about-banner.jpg" }
                alt=""
                />
              </div>
    
              <div className="about-banner-text">
                <h1 className="about-banner-inner-text">ABOUT US</h1>
                <h2 className="banner-inner-text">We Empower Up and Coming Musicians With Cash Prices And Sponsorships</h2>
                <p className="banner-inner-text">With a litte donation you can make someone's dream come true</p>
                <button className="about-donate">BECOME A PATRON</button>
              </div>
              <div className="banner-history">
                <div className="about-icon">Mictok Stream...</div>
                <div className="about-icon">Radulam Tech Academy</div>
                
              </div>
              <div className="about-gist">
                <div className="about-gist-text">
                  <h1 className="about-gist-text-text">Lets talk about mictokk</h1>
                  <p className="about-gist-para">
                    Hi.. <br />
                    Welcome to Mictokk, An application that connects and draws Up and coming Nigerian and African artists (Singers, rapper, freestylers) closer to the realization of their dreams.
                    Our App idea was borne out of the need to bridge the gap between talent and resources. We realized that they are so many talented people out here in africa and alot are limited by funds and capacity to even embark upon any meaningful action to take their talents to the next level.
                    <br />
                    <br />
                    After careful survey, we discovered that alot of these artist have challenges with raising money for studio time, as music production is now a very expensive project and others have issues such as "My music is ready but no funds to shoot a matching video or to promote it to the world" So we decided to put together a niche platform where they can show these talents for free and hopefully get connected to labels or get sponsorships from well meaning Individuals who think their talent is worth something.
                    
                  </p>
                  <br />
                  <h2 className="our-products">
                    How It Works...
                  </h2>
                  <br />
                  <li className="our-products-text">
                    Post a video, invite friends to like your page and recommed you for sponsorship by upvoting your video. this will cost them N500 and you need a minimum of 500 recommendations on your videos within a period of 3months to be considered for sponsorship
                  </li>
                  <li className="our-products-text">
                    Sponsorship Packages range from 5 million Naira cash prize to recording deals
                  </li>
                  <li className="our-products-text">
                    New Challenges and give aways for artists will be announced every week with various cash prizes and gifts. follow instructions to participate. Fans and friends will be able to vote at N100 per vote. The Artist whose video has the highest votes each week wins but must have a minimum of 10votes to win.
                  </li>
                  <li className="our-products-text">
                     General Give Aways for fans and artists a like will take place on our social media platforms
                  </li>
                  <li className="our-products-text">
                      Monthly Studio Time/Cash Empower for Randomly selected users. Decided by in house management based on the artists potential.
                  </li>
                  <li className="our-products-text">
                    Video Shoot Cash Empowerment for Artists Selected by Patrons (Periodically);
                  </li>
                  <li className="our-products-text">
                    Connecting Artists with Record Labels
                  </li>
                  <li className="our-products-text">
                    Mictok Talent Hunt Show (Coming soon...All artists will be picked from the platform)
                  </li>
                  <li className="our-products-text">
                    Collaborations with producers to make beats available for challenges are artists.
                  </li>
                  <li className="our-products-text">
                    Empowerment Training for Artists(Learning how to play intruments, voice traing, and music training)
                  </li>

                  <h1 className="projects">Projects...</h1>
                  <li className="our-project-text">
                    Mictok Audio Streaming App...that pays the Artist on every Stream 
                    <Link to="/seed-funding">
                    <button className="project-btn">JOIN SEED FUNDING</button>
                    </Link>
                   
                  </li>
                  <li className="our-project-text">
                    Radulam Networks Tech Academy our partners are training fullstack developers to build apps like mictok are many more to solve problems in our society at subsidized rates. Thanks to our Patrons.
                  </li>
                  <li className="our-project-text">
                    Mictok Music Marketplace... (Sell your songs, lyrics and beats to big brands and artists). And much more...
                  </li>
                  </div>
                <div className="about-gist-img">
                <div className="about-aside"><img className="about-aside-img" src="https://cdn.pixabay.com/photo/2016/08/10/20/52/mixing-1584267__340.jpg" /></div>
                <div className="about-aside"><img className="about-aside-img" src="https://cdn.pixabay.com/photo/2016/01/31/21/37/microphone-1172260__340.jpg" /></div>
                </div>

                <div className="about-social">
                 <div>
                   <h3>Follow Us</h3>
                 <span className="current-about-span"><Instagram /></span>
                <span className="current-about-span"><Facebook /></span>
                <span className="current-about-span"><Twitter /></span>
                <span className="current-about-span"><LinkedIn /></span>
                 </div>
                
          </div>
            </div>
         
          </div>
        
    )
}

export default AboutPage
