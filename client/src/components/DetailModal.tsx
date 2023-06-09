import React from 'react'
import { DetailContent } from '../types/types'
import CloseIcon from '@mui/icons-material/Close';


const DetailModal: React.FC<DetailContent> = ({ volumeInfo, setShowDetail }) => {
  return (
    <>
      <div className='w-[700px] px-8 py-10 border-l-4 border-lightgreen absolute top-1/2 left-1/2 bg-darkblue-main -translate-x-1/2 -translate-y-1/2 rounded-2xl z-50'>
        <div className='flex flex-col gap-10'>
          <div className='flex gap-6 text-white'>
            <img src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "/noimage.png"} alt="" className='w-[120px] h-[150px] object-cover' />
            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='text-2xl font-bold'>{volumeInfo.title}</h3>
                <span className='block mt-1'>著者：{volumeInfo.authors ? volumeInfo.authors : "unknown"} {volumeInfo.publishedDate}</span>
              </div>
            </div>
            <button className='block w-fit h-fit ml-auto border border-lightgreen rounded-full p-3 bg-darkblue-sub hover:bg-darkblue-main' onClick={() => setShowDetail(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className='h-[360px] overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700'>
            <p className='text-gray-400'>
              {volumeInfo.description && volumeInfo.description}
            </p>
          </div>
        </div>
      </div>
      <div className='absolute inset-0 bg-[rgba(53,53,53,0.43)] z-20' onClick={() => setShowDetail(false)}></div>
    </>
  )
}

export default DetailModal