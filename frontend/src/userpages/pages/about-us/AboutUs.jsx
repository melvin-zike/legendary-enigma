import React from 'react'
import "./aboutus.scss";
import Topbar from "../../../usersapp/components/topbar/Topbar"
import Sidebar from '../../../usersapp/components/sidebar/Sidebar'
import AboutPage from "./AboutPage"

const AboutUs = () => {
    return (
        <>
        <Topbar />
         <div className="about-us">
         <AboutPage />  
         </div>
         
        </>
    )
}

export default AboutUs
