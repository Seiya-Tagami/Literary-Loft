import React from 'react'
import { OneAreaOfBookshelfProps } from '../types/types'


const OneAreaOfBookshelf: React.FC<OneAreaOfBookshelfProps> = ({ label, labelColor }) => {
  return (
    <div className='w-full h-auto bg-darkblue-sub flex flex-col'>
      <div className='w-[85%] mx-auto mt-8'>
        <div className='w-fit px-3 py-2 rounded' style={{ background: labelColor }}>
          <h2 className='text-darkblue-main text-4xl font-extrabold font-SpaceMono'>{label}</h2>
        </div>
        <div className='w-full flex gap-12 overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700 mt-8'>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
          <div className='w-[160px] h-[200px] bg-white flex-shrink-0'></div>
        </div>
      </div>
    </div>
  )
}

export default OneAreaOfBookshelf