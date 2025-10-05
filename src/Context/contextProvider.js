// MyContextProvider.js
import React, { useState,useContext } from "react";
import MyContext from "./createContext";
const MyContextProvider = ({ children }) => {

  const [data, setData] = useState("Initial Value");
  const[DailyData,setDailyData]=useState([]);
  const[DailyDatac,setDailyDatac]=useState([]);
  const[userData,setUserdata]=useState({});
  const[activityData,setActivityData]=useState([]);
  const[goal,setuserGoal]=useState([]);
  const[isLogin,setisLogin]=useState(false);

  const sendData=async(path,obj)=>{
    try {
      console.log("Making request to:", path, "with data:", obj); // Debug log
      
      const getdata = await fetch(path, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
      });
      
      console.log("Response status:", getdata.status); // Debug log
      
      if (!getdata.ok) {
        throw new Error(`HTTP ${getdata.status}: ${getdata.statusText}`);
      }
      
      const jsondata = await getdata.json();
      console.log("Response data:", jsondata); // Debug log
      
      setUserdata({...jsondata})
      if(!jsondata.error){
        setActivityData([...jsondata.Activity]);
        setisLogin(true);
      }
      return jsondata;
    } catch (error) {
      console.error("sendData error:", error);
      return { error: error.message };
    }
  }
  const getDailydatauser=async(obj)=>{
    const getdailydata = await  fetch("https://carbon-footprint-backend.vercel.app/activity/dailyactivity", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    const data= await getdailydata.json();
    setDailyData([...data.daily]);
    return data;
  }
  // for compare
  const getDailydatacompare=async(obj)=>{
    const getdailldatac = await  fetch("https://carbon-footprint-backend.vercel.app/activity/dailyactivity", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    const data= await getdailldatac.json();
    if(data.daily){
      setDailyDatac(data.daily);

    }
    return data;
  }

 
  const setGoal=async(obj)=>{
    const getallgoal = await  fetch("https://carbon-footprint-backend.vercel.app/activity/getgoal", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    const data= await getallgoal.json();
    setuserGoal([...data]);
  }

  const addGoal=async(obj)=>{
    const addgoal = await  fetch("https://carbon-footprint-backend.vercel.app/activity/addgoal", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })

    const data= await addgoal.json();
    if(data.success){
      setuserGoal([...goal,data.goal]);
    }

  }
  const logout=()=>{
    setisLogin(false);
    setUserdata({});
    setActivityData([]);
    setDailyData([]);
    setDailyDatac([]);
    setuserGoal([]);
  }
const obj ={data,setData,sendData,setDailyDatac,goal,DailyDatac,addGoal,getDailydatacompare,setGoal,getDailydatauser,isLogin,setisLogin,userData,activityData,DailyData,setDailyData}
  return (
    <MyContext.Provider value={obj}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
