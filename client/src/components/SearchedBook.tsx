import React from 'react'
import { Book } from '../types/types'

//TODO 一旦anyで回避
const SearchedBook : React.FC<any> = ({ book, handleShowDetail }) => {
  return (
    <div className='w-full p-4 text-white flex items-center gap-6  bg-darkblue-main border-l-4 border-lightgreen' key={book.id}>
      <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/noimage.png"} alt="" className='w-[120px] h-[150px] object-cover' />
      <div className='flex-1 flex flex-col gap-4'>
        <div>
          <h3 className='text-xl font-bold'>{book.volumeInfo.title}</h3>
          <span className='block mt-1'>著者：{book.volumeInfo.authors ? `${book.volumeInfo.authors[0]}${book.volumeInfo.authors.length > 1 ? "ほか" : ""}` : "unknown"}</span>
        </div>
        <p className='text-gray-400'>{book.volumeInfo.description && book.volumeInfo.description.substring(0, 200)}{book.volumeInfo.description && book.volumeInfo.description.length > 250 && "..."}</p>
        <div className='flex gap-3'>
          <button className='w-fit bg-yellow-300 text-darkblue-sub font-bold px-3 py-2 rounded-md' onClick={() => handleShowDetail(book.id)}>Check the detail</button>
          <button className='w-fit bg-lightgreen text-darkblue-sub font-bold px-3 py-2 rounded-md'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default SearchedBook