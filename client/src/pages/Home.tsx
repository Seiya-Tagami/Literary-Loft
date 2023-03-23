import React from 'react'
import MiniMenu from '../components/Menu/Menu'
import OneAreaOfBookshelf from '../components/OneAreaOfBookshelf'
import { labels } from "../constants/index"

const Home: React.FC = () => {
  return (
    <div className='mt-[90px] min-h-screen'>
      {labels.map(label => (
        <OneAreaOfBookshelf label={label.label} labelColor={label.labelColor} key={label.label} />
      ))}
    </div>
  )
}

export default Home