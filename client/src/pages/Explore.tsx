import React, { useRef, useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import DetailModal from "../components/DetailModal"
import { searchMethods } from '../constants';
import { Book } from '../types/types';
import { CircularProgress } from '@mui/material';
import SearchedBook from '../components/SearchedBook';


const Explore: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [searchMethod, setSearchMethod] = useState<string>("title")
  const [pageNum, setPageNum] = useState<number>(0)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [detailContent, setDetailContent] = useState<Book | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const handleSetGenre = (e: React.MouseEvent, methodType: string) => {
    e.preventDefault()
    setSearchMethod(methodType)
  }

  const handleShowDetail = (id: string) => {
    const targetBook = books?.filter(book => book.id === id)[0]
    setDetailContent(targetBook)
    setShowDetail(true)
  }

  const fetchGoogleBooksData = async () => {
    setLoading(true)

    const titleQuery = `intitle:${searchRef.current?.value}`
    const authorQuery = `inauthor:${searchRef.current?.value}`
    const freeWordQuery = `${searchRef.current?.value}`

    const endpointURL = `https://www.googleapis.com/books/v1/volumes?q=
    ${searchMethod === "title" ? titleQuery :
        searchMethod === "author" ? authorQuery :
          freeWordQuery}&maxResults=10&startIndex=${pageNum}`

    const res = await fetch(endpointURL);
    const json = await res.json();

    if (json.items) {
      setBooks(json.items)
    } else {
      setBooks([])
    }

    setLoading(false)
  }

  // click時に検索
  const onClickSearch = (e: React.MouseEvent) => {
    e.preventDefault()

    // validation
    if (searchRef.current?.value.length === 0) {
      alert('文字を入力してください')
      return
    }

    fetchGoogleBooksData()
  }

  // enterで検索
  const onEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.code == "Enter") {
      // validation
      if (searchRef.current?.value.length === 0) {
        alert('文字を入力してください')
        return
      }

      e.preventDefault()
      fetchGoogleBooksData()
    }

  }

  const goToPrevPage = () => {
    setPageNum((prev) => prev - 10)
    setBooks([])
    fetchGoogleBooksData()
  }

  const goToNextPage = () => {
    setPageNum((prev) => prev + 10)
    setBooks([])
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
            <div className='flex gap-4 flex-col w-[210px] mt-2 text-darkblue-main'>
              {searchMethods.map(method => (
                <button className={`bg-green-100 font-semibold px-3 ${searchMethod === `${method.method}` && "!bg-lightgreen scale-110 duration-300"}`} onClick={(e) => handleSetGenre(e, `${method.method}`)} key={method.title}>
                  <ArrowRightIcon />
                  {method.title}
                </button>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
              <span className='text-[24px] text-white font-SpaceMono'>{searchMethod === "title" ? "Book title" : searchMethod === "author" ? "Author" : "Free word"}</span>
              <input type="text" className='rounded px-2 py-1 focus:outline-none bg-green-100' ref={searchRef} onKeyDown={onEnterSearch} />
            </div>
          </div>
          <button
            type='button'
            className='text-darkblue-main bg-white w-fit mx-auto text-[32px] px-3 py-2 font-bold'
            onClick={onClickSearch}
          >
            Search</button>
        </form>
        <div className={`w-[660px] h-[720px] px-4 py-10 flex flex-col gap-10 overflow-y-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-700 ${!books.length && 'justify-center'} relative`}>
          {books.length ? (
            <>
              {books.map(book => (
                <SearchedBook book={book} handleShowDetail={handleShowDetail} key={book.id} />
              ))}
              <div className='flex gap-8 text-[20px] font-bold'>
                {pageNum !== 0 && (<button className='bg-slate-400 hover:bg-slate-300 duration-200 p-2 rounded-lg flex-1' onClick={() => goToPrevPage()}>Prev</button>)}
                <button className='bg-slate-400 hover:bg-slate-300 duration-200 p-2 rounded-lg flex-1' onClick={() => goToNextPage()}>Next</button>
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center'>
              <p className='text-[40px] text-white text-bold font-SpaceMono'>No Books, No Life♭</p>
              <img src="/shiba-inu.png" alt="reading-book" className='w-[400px]' />
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