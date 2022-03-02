import "./home.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import {userData} from "../../dummyData";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
    const [userStats, setUserStats] = useState([])
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
  const MONTHS = useMemo(() => 
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
   ],[]) 
  useEffect(() => {
   const getStats = async () =>{
     try{
      const res = await axiosInstance.get('/users/stats', {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
       },
       });

       const statsList = res.data.sort(function (a, b) {
            return a._id - b._id;
       });
       statsList.map((item) => setUserStats(prev=>[...prev,{name:MONTHS[item._id - 1], "New User": item.total},
      ]));
     }catch(err){
       console.log(err);
     }
   }
   getStats();
  }, [])
  
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
            <div className="homeWidgets">
                <WidgetSmall />
                <WidgetLg />
            </div>
        </div>
    )
}
