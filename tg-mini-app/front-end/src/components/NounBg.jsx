import React, { useEffect } from 'react'
import { headFiles } from '../utils/constants'

const NounBg = () => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      
  return (
    <div className='w-full absolute'>
        <img src={`/traits-svg/3-heads/${headFiles[getRandomInt(1, headFiles.length)]}`} alt="" />
        <img src={`/traits-svg/3-heads/${headFiles[getRandomInt(1, headFiles.length)]}`} alt="" />
        <img src={`/traits-svg/3-heads/${headFiles[getRandomInt(1, headFiles.length)]}`} alt="" />
        <img src={`/traits-svg/3-heads/${headFiles[getRandomInt(1, headFiles.length)]}`} alt="" />
        <img src="/traits-svg/3-heads/head-ape.svg" alt="head"  className='w-[240px] h-[240px] absolute z-0'/>
    </div>
  )
}

export default NounBg