import React, { useState } from "react";
import Cards from "./Cards";
import ShowCard from "./ShowCard";
import { Snackbar } from "@mui/material";
import { updateLeaderboard } from "../WebSocket";


const Game = ({name, updateLeaderboardData, score, setScore}) => {
  const [showCard, setshowCard] = useState([]);
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState("")
  const type = ["cat", "defuse", "shuffle", "bomb"];
  

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let shuffledCards = [];
  const getcards = () => {
    let i = 0;
    while (i < 5) {
        let randomIndex = getRandomInt(0, type.length - 1);
        if (type[randomIndex] === "Bomb" && i === 0) {
            // If the first card is a "Bomb", skip it and try again
            continue;
        }
        shuffledCards.push(type[randomIndex]);
        i++;
    }
}
  getcards();
  const restart = ()=>{

    shuffledCards =[]
    setshowCard([]);
    getcards();
    setCards(shuffledCards);
    setDiffuse(0);
  }
  const [cards, setCards] = useState([...shuffledCards]);
  const [diffuse, setDiffuse] = useState(0);
  const handleCardClick = (index) => {
    const clickedCard = cards[index];
    const newCards = [...cards.slice(0, index), ...cards.slice(index + 1)];
    setCards(newCards);
    setshowCard([...showCard, clickedCard]);
    if((cards.length === 1 && clickedCard === "bomb" && diffuse !== 0) ||( cards.length === 1 && clickedCard !== 'bomb')){
      setScore(score+1);
      updateLeaderboard(name,score+1).then((res) => {updateLeaderboardData(res.value);}).catch((err)=> console.log(err));
      
    }
   
    switch (clickedCard) {
        case "cat":
          setMessage("You found a cat 🐈")
            setSnack(true);
            break;
        case "defuse":
            setDiffuse(diffuse+1);
            setMessage("You found a defuse 💥")
            setSnack(true);
            break;
        case "shuffle":
          setMessage("You found a shuffle, Game Restarts!");
          setSnack(true);
            restart();
            break;
        case "bomb":
            if(diffuse === 0){
              setSnack(true);
              setMessage("You found a bomb 💣, Game Over!");
              restart();
            }
            else{
              setDiffuse(diffuse-1);
              setSnack(true);
              setMessage("You found a bomb 💣, saved by a defuse, be Carefull!");
             
            }
            break;
    
        default:
            break;
    
    }
  };
  return (
     
    <>
    <div
      className="flex justify-center mt-12 items-center
      "
    > 
      <Snackbar
         open={snack}
         autoHideDuration={1500}
         onClose={()=>setSnack(false)}
         anchorOrigin={{"horizontal":"center","vertical":"top"}}
         message={message}
      />
      <div
        className="relative"
        style={{ width: "18vw", aspectRatio: "2.25/3.5" }}
      >
        {cards.map((item, index) => {
          return (
            <Cards
              // className={`top-${index}px left-${index}`}
              handleClick={handleCardClick}
              key={index}
              index={index}
            />
          );
        })}
      
       
      </div>
      <div
        className="relative"
        style={{ width: "18vw", aspectRatio: "2.25/3.5" }}
      >
        {showCard.length === 0 ? (
          <ShowCard card={"OPEN A CARD"} />
        ) : (
          showCard.map((item, index) => {
            return (
              <ShowCard
                card={item}
                index={index}
                className={`top-${index} left-${index}`}
                key={index}
              />
            );
          })
        )}
      </div>
      <div>
        <div>
💥{diffuse}
        </div>
      </div>
    </div>
    <div className="text-center mb-3">
        Score : <span className="text-xl font-light">{score} 🏆</span>
    </div>
    <div className="text-center">
        <button className="text-lg font-bold p-3 rounded bg-blue-600 text-white tracking-widest" onClick={()=> restart()}>
            RESTART
        </button>
    </div>
    </>
  );
};

export default Game;
