import React from 'react'
import { twMerge } from 'tailwind-merge'

const ShowCard = ({card, className, index}) => {

    switch (card) {
        case "cat":
            return<div className={twMerge(['absolute h-96 rounded p-3 shadow-md shadow-slate-800 bg-white', className])} style={{aspectRatio: "2.25/3.5", top:index+index, left:index+index}}>
                <div className='flex text-center justify-center items-center h-full flex-col'>
                It's a&nbsp;
                {card}
                <br /> <span className='text-5xl'>
                    😺
                </span>
                </div>
            </div>

        case "shuffle":
            return<div className={twMerge(['absolute h-96 rounded p-3 shadow-md shadow-slate-800 bg-white', className])} style={{aspectRatio: "2.25/3.5", top:index+index, left:index+index}}>
                <div className='flex text-center justify-center items-center h-full flex-col'>
                It's a&nbsp;
                {card}
                <br /> <span className='text-5xl'>
                    🃏
                </span>
                </div>
            </div>
            
        case "defuse":
            return<div className={twMerge(['absolute h-96 rounded p-3 shadow-md shadow-slate-800 bg-white', className])} style={{aspectRatio: "2.25/3.5", top:index+index, left:index+index}}>
                <div className='flex text-center justify-center items-center h-full flex-col'>
                It's a&nbsp;
                {card}
                <br /> <span className='text-5xl'>
                    💥
                </span>
                </div>
            </div>
            

        case "bomb":
            return<div className={twMerge(['absolute h-96 rounded p-3 shadow-md shadow-slate-800 bg-white', className])} style={{aspectRatio: "2.25/3.5", top:index+index, left:index+index}}>
                <div className='flex text-center justify-center items-center h-full flex-col'>
                It's a&nbsp;
                {card}
                <br /> <span className='text-5xl'>
                    💣
                </span>
                </div>
            </div>

    
        default:
            return<div className={twMerge(['absolute h-96 rounded p-3 shadow-md shadow-slate-800 bg-white border-e-gray-100', className])} style={{aspectRatio: "2.25/3.5"}}>
                <div className='flex text-center justify-center items-center h-full'>

                {card}
                </div>
            </div>

    }
}

export default ShowCard
