import React from "react";
import { IoMdClose } from "react-icons/io";

const LeaderBoard = ({ setShowleaderboards, leaderBoardData}) => {
  return (
    <div className="w-[20vw] p-4 ">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl text-orange-700">
          Leaderboard
        </span>
        <span
          className="cursor-pointer text-xl"
          onClick={() => setShowleaderboards(false)}
        >
          <IoMdClose />
        </span>
      </div>

      <div className="flex justify-between m-2">
        <div className="font-bold">Username</div>
        <div className="font-bold">Score</div>
      </div>
      
        {
          leaderBoardData.map((item, index)=>{
            if(index == 0){
              return(
                <div className="flex justify-between pl-3 pr-3">
              <div className="font-semibold">{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</div>
              <div className="font-semibold">{item.score} 🏆 </div>
              </div>
              )
            }
            return(
              <div className="flex justify-between pl-3 pr-3">
              <div>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</div>
              <div>{item.score} 🏆 </div>
              </div>
            )
          })
        }
        
    </div>
  );
};

export default LeaderBoard;
