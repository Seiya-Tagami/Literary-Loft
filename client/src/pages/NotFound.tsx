import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center '>
        <h1 className='text-lightgreen font-bold text-5xl'>Not Found 404</h1>
        <img src="/searching-shiba-inu.png" alt="" />
        <Link to="/" className='text-lightgreen text-2xl underline'>
          Go back to Home
          <HomeIcon className='ml-2' />
        </Link>
      </div>
    </div>
  )
}

export default NotFound