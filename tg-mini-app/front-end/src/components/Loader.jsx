import React from 'react'
import { accessoryFiles, bodyFiles, glassesFiles, headFiles } from '../utils/constants';

const Loader = () => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  return (
    <div className='w-full mt-[-150px]'>
        Loading...
        <img src={`/traits-svg/3-heads/${headFiles[getRandomInt(1, headFiles.length)]}`} alt="" className='absolute z-10'/>
        <img src={`/traits-svg/4-glasses/${glassesFiles[getRandomInt(1, glassesFiles.length)]}`} alt="" className='absolute z-20'/>
        <img src={`/traits-svg/1-bodies/${bodyFiles[getRandomInt(1, bodyFiles.length)]}`} alt="" className='absolute z-10'/>
        <img src={`/traits-svg/2-accessories/${accessoryFiles[getRandomInt(1, accessoryFiles.length)]}`} alt="" className='absolute z-20'/>
    </div>
  )
}

export default Loader