import React from 'react'
import image from '../images/card.png'
const Cards = ({index,handleClick }) => {
    const handleCardClick = () => {
        handleClick(index);
      };
  return (

    <div className={`absolute  aspect-[2.25/3.5] h-96 rounded p-3 shadow-md shadow-slate-800 border-e-gray-100 bg-white `} style={{ top:  index+index, left: index+index}} onClick={handleCardClick}>
      <img src={image} alt="" className='h-full w-full' />  
    </div>
  )
}

export default Cards
