import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";
import Input from "@mui/material/Input";
import { Snackbar } from "@mui/material";
import axios from "axios";

const User = ({ setShowuserdetail, setName, name, updateLeaderboardData, checkuser , setScore, setSnack2, setMessage2}) => {

  
  const handlesubmit = async () => {

    let data = JSON.stringify({
      "Username": name
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://explodingkitten-8d1p86jf.b4a.run/add-user',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    
    axios.request(config)
    .then((res) => {
      
      if(res.data.State === "already exists"){
        setScore(res?.data.Score)
        setMessage2(`Welcome Back ${name} 💖`)
        setSnack2(true);
      }
      else{
        setScore(0)
        setMessage2(`Welcome ${name} to the Exploding-Kitten 🐈`)
        setSnack2(true);
        updateLeaderboardData({
          "username" : name,
          "score": 0
        }, "add")
      }
    }).then(()=>{
      
    })
    .catch((error) => {
      // console.log(error);
    });
    setShowuserdetail(false);
    checkuser(true);
    
  };

  return (
    <>
    <div className="w-[20vw] p-4 ">
      
      <div className="flex items-center justify-between mb-6">
        <span></span>
        <span
          className="cursor-pointer text-xl"
          onClick={() => setShowuserdetail(false)}
        >
          <IoMdClose />
        </span>
      </div>
      <div className="h-[75vh] flex flex-col justify-center">
        <div className="text-6xl text-center">🐈</div>
        <div className="mb-6 text-center text-2xl">
          Welcome to Exploding Kitten

        </div>
        <div className="flex justify-center mb-4">
          <Input
            id="standard-basic"
            placeholder="Username"
            onChange={(e) => {
              setName(e.target.value);
              // console.log(name);
            }}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            className=" p-2 cursor-pointer bg-blue-500 rounded text-white tracking-wider"
            onClick={() => handlesubmit()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default User;







// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://explodingcat-wr3whcgw.b4a.run/get-user?username=dinesh',
//   headers: { 
//     'Accept': 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   withCredentials: false,
//   // data : data
// };