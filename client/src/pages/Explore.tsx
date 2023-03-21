import React, { useEffect, useRef, useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import DetailModal from "../components/DetailModal"
import { Book } from '../types/types';
import { TrendingUpRounded } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';


const Explore: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [searchMethod, setSearchMethod] = useState("title")
  const [showDetail, setShowDetail] = useState(false)
  const [detailContent, setDetailContent] = useState<Book | null>(null)
  const [loading, setLoading] = useState(false)

  const bookTitleRef = useRef<HTMLInputElement>(null)
  const bookAuthorRef = useRef<HTMLInputElement>(null)
  const bookFreewordRef = useRef<HTMLInputElement>(null)

  const handleSetGenre = (e: React.MouseEvent, methodType: string) => {
    e.preventDefault()
    setSearchMethod(methodType)
  }

  const handleShowDetail = (id: string) => {
    const targetBook = books?.filter(book => book.id === id)[0]
    setDetailContent(targetBook)
    setShowDetail(true)
  }

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault()

    // validation
    if (searchMethod === "title" && bookTitleRef.current?.value.length === 0) {
      alert('文字を入力してください')
      return
    }

    if (searchMethod === "author" && bookAuthorRef.current?.value.length === 0) {
      alert('文字を入力してください')
      return
    }

    if (searchMethod === "free" && bookFreewordRef.current?.value.length === 0) {
      alert('文字を入力してください')
      return
    }

    const fetchGoogleBooksData = async () => {
      setLoading(true)
      const titleQuery = `intitle:${bookTitleRef.current?.value}`
      const authorQuery = `inauthor:${bookAuthorRef.current?.value}`
      const freewordQuery = `${bookFreewordRef.current?.value}`

      const endpointURL = `https://www.googleapis.com/books/v1/volumes?q=
      ${searchMethod === "title" ? titleQuery :
          searchMethod === "author" ? authorQuery :
            freewordQuery}`

      const res = await (await fetch(endpointURL)).json();
      console.log(res.items)
      setBooks(res.items)
      setLoading(false)
    }

    fetchGoogleBooksData()
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex items-center gap-[120px]'>
        <form className='flex flex-col gap-10 bg-darkblue-main w-[540px] px-[70px] py-[60px] border border-lightgreen'>
          <h2 className='text-[36px] font-bold text-white mx-auto'>Explore</h2>
          <div>
            <span className='text-gray-300'>
              🚀Select the search method
            </span>
            <div className='flex gap-4 flex-wrap mt-2'>
              <button className={`text-darkblue-main font-semibold px-3 py2 bg-orange-300 rounded ${searchMethod === "title" && "border-2 border-lightgreen"}`} onClick={(e) => handleSetGenre(e, 'title')}>
                <ArrowRightIcon />
                Search with book title
              </button>
              <button className={`text-darkblue-main font-semibold px-3 py2 bg-blue-300 rounded ${searchMethod === "author" && "border-2 border-lightgreen"}`} onClick={(e) => handleSetGenre(e, 'author')}>
                <ArrowRightIcon />
                Search with author
              </button>
              <button className={`text-darkblue-main font-semibold px-3 py2 bg-yellow-300 rounded ${searchMethod === "free" && "border-2 border-lightgreen"}`} onClick={(e) => handleSetGenre(e, 'free')}>
                <ArrowRightIcon />
                Search with free word
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            {
              searchMethod === "title" ? (
                <div className='flex justify-between'>
                  <span className='text-[24px] text-white'>Book title</span>
                  <input type="text" className='bg-orange-300 rounded px-2 py-1 focus:outline-none' ref={bookTitleRef} />
                </div>
              ) : searchMethod === "author" ? (
                <div className='flex justify-between'>
                  <span className='text-[24px] text-white'>Author</span>
                  <input type="text" className='bg-blue-300 rounded px-2 py-1 focus:outline-none' ref={bookAuthorRef} />
                </div>
              ) : (
                <div className='flex justify-between'>
                  <span className='text-[24px] text-white'>Free word</span>
                  <input type="text" className='bg-yellow-300 rounded px-2 py-1 focus:outline-none' ref={bookFreewordRef} />
                </div>
              )
            }
          </div>
          <button
            type='button'
            className='text-darkblue-main bg-lightgreen w-fit mx-auto text-[32px] px-3 py-2'
            onClick={(e) => handleSearch(e)}
          >
            Search</button>
        </form>
        <div className={`w-[660px] h-[720px] p-4 flex flex-col gap-10 overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700 ${!books.length && 'justify-center'} relative`}>
          {books.length ? (books.map(book => (
            <div className='w-full p-4 text-white flex items-center gap-6  bg-darkblue-main border-l-4 border-lightgreen' key={book.id}>
              <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/noimage.png"} alt="" className='w-[120px] h-[150px] object-cover' />
              <div className='flex-1 flex flex-col gap-4'>
                <div>
                  <h3 className='text-xl font-bold'>{book.volumeInfo.title}</h3>
                  <span className='block mt-1'>著者：{book.volumeInfo.authors ? book.volumeInfo.authors : "unknown"}</span>
                </div>
                <p className='text-gray-400'>{book.volumeInfo.description && book.volumeInfo.description.substring(0, 220)}{book.volumeInfo.description && book.volumeInfo.description.length > 250 && "..."}</p>
                <div className='flex gap-3'>
                  <button className='w-fit bg-yellow-300 text-darkblue-sub font-bold px-3 py-2 rounded-md' onClick={() => handleShowDetail(book.id)}>Check the detail</button>
                  <button className='w-fit bg-lightgreen text-darkblue-sub font-bold px-3 py-2 rounded-md'>Register</button>
                </div>
              </div>
            </div>
          ))) : (
            <div className='flex flex-col items-center'>
              <p className='text-[40px] text-white text-bold font-SpaceMono'>No Books, No Life♭</p>
              <img src="/reading-book.png" alt="reading-book" className='w-[400px]' />
            </div>
          )}
          {loading && <CircularProgress className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
        </div>
      </div>
      {
        detailContent && showDetail && (
          <DetailModal volumeInfo={detailContent.volumeInfo} setShowDetail={setShowDetail} />
        )
      }
    </div>
  )
}

export default Explore