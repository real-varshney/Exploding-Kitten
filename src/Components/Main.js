import { useEffect, useState } from "react";
import Game from "./Game";
import {Drawer} from "@mui/material";
import LeaderBoard from "./LeaderBoard";
import { PiCatDuotone } from "react-icons/pi";
import { Snackbar } from "@mui/material";


import User from "./User";
import axios from "axios";



function Main({socketData}) {
  const [start, setStart] = useState(false);
  const [name, setName] = useState("guest");
  const [showleaderboards, setShowleaderboards] = useState(false);
  const [showuserdetail, setShowuserdetail] = useState(false);
  const [connected, setConnected] = useState(localStorage.getItem("isConnected"));
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [score, setScore] = useState(0);
  const [snack2, setSnack2] = useState(false);
  const [message2, setMessage2] = useState("")


  const checkuser = (value) => {
    if(value === true){
      setStart(value);
    }
    else{
      setShowuserdetail(true);
    }
  };


  const updateLeaderboardData = (data, type="update") => {
    if(type === "update"){
      const userIndex = leaderBoardData.findIndex(obj => obj?.username?.trim().toLowerCase() === data?.username?.trim().toLowerCase());
  
    if (userIndex !== -1) {
      const newdata = [
        ...leaderBoardData.slice(0, userIndex),
        { ...leaderBoardData[userIndex], score: data.score },
        ...leaderBoardData.slice(userIndex + 1),
      ];

      newdata.sort((a, b) => b.score - a.score);
      if(newdata.length > 0){
        setLeaderBoardData(newdata)

      }
    }
    }
    else{
      const newdata = [...leaderBoardData, data];
      newdata.sort((a, b) => b.score - a.score);
      setLeaderBoardData(newdata);
    }
    
  };

  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "https://explodingkitten-8d1p86jf.b4a.run/get-user-details",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: false,
  };

  useEffect(() => {
    const getData = ()=>{
      axios
      .request(config)
      .then((response) => {
         setLeaderBoardData(response?.data);     
      })
      .catch((error) => {
        console.log(error);
      });
    }

      return ()=>{
        getData();
        localStorage.setItem("isConnected", true);    
      }

  }, []);

  useEffect(()=>{
    updateLeaderboardData(socketData);
  },[socketData])

  return (
    <section className="p-5 h-screen w-screen">
      <Snackbar
         open={snack2}
         autoHideDuration={1000}
         onClose={()=>setSnack2(false)}
         anchorOrigin={{"horizontal":"center","vertical":"top"}}
         message={message2}
      />
      <div className="flex justify-between pl-10 pr-10 ">
        <button
          className="border p-2 pl-3 pr-3 bg-green-500 text-white rounded w-1/7"
          onClick={() => setShowleaderboards(true)}
        >
          Leaderboards🏆
        </button>
        <Drawer
          open={showleaderboards}
          onClose={() => setShowleaderboards(false)}
        >
          <LeaderBoard
            setShowleaderboards={setShowleaderboards}
            leaderBoardData={leaderBoardData}
          />
        </Drawer>

        <button
          className="font-bold uppercase cursor-pointer flex flex-col items-center text-2xl"
          onClick={() => setShowuserdetail(true)}
        >
          {name || "Guest"}
          <br /> <PiCatDuotone />
        </button>
        <Drawer
          open={showuserdetail}
          anchor="right"
          onClose={() => setShowuserdetail(false)}
        >
          <User
            setShowuserdetail={setShowuserdetail}
            setName={setName}
            name={name}
            leaderBoardData={leaderBoardData}
            updateLeaderboardData={updateLeaderboardData}
            checkuser={checkuser}
            setScore={setScore}
            setMessage2={setMessage2}
            setSnack2={setSnack2}
          />
        </Drawer>
      </div>
      <div>
        <h1 className="text-4xl font-bold font-sans text-orange-800 uppercase text-center">
          Exploding Kitten🐈
        </h1>
      </div>

      {start ? (
        <Game name={name} updateLeaderboardData={updateLeaderboardData} score={score} setScore={setScore} />
      ) : (
        <div className="w-fit max-w-3/4 p-5 pb-8 text-black bg-slate-200 rounded absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-2xl underline underline-offset-4 mb-3 text-center">
            Rules
          </h3>
          <div>
            <li>Win: Draw all 5 cards without exploding.</li>
            <li>
              Cards:
              <ul className="ml-8">
                <li>Cat (😺): Discard, no effect.</li>
                <li>
                  Defuse (❌): Save yourself from 1 Exploding Kitten (discard
                  both).
                </li>
                <li>Shuffle (🃏): Reshuffle the deck (risky!).</li>
                <li>
                  Exploding Kitten (💣): Instant loss (unless you have Defuse).
                </li>
              </ul>
            </li>
            <li>Turns: Draw 1 card. No hand size limit.</li>
          </div>
          <div className="flex justify-center mt-5">
            {connected !== false ? (
              <button
                className="border p-1 bg-blue-600 text-white rounded w-1/4"
                onClick={() => {
                  checkuser();
                }}
              >
                START
              </button>
            ) : (
              <button className="border p-1 bg-red-400 text-white rounded w-1/4">
                START
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Main;
