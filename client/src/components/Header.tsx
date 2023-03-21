import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [active, setActive] = useState(false)

  return (
    <header className='w-full h-[90px] px-[40px] py-[12px] bg-darkblue-main fixed top-0 left-0 right-0 z-20'>
      <div className='w-full h-full flex justify-between items-center text-white'>
        <h1 className='text-[36px] font-extrabold font-SpaceMono italic'><Link to="/">Literary Loft</Link></h1>
        <div className='w-[210px] h-full rounded-lg border border-lightgreen bg-darkblue-main flex justify-center items-center cursor-pointer relative' >
          <div className="flex justify-center items-center gap-6" onClick={() => setActive(!active)}>
            <img src="/chainsaw-man.jpg" alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
            <span>Seiya Tagami</span>
          </div>
          {
            active && (
              <div className="w-[300px] h-[360px] bg-darkblue-main absolute right-0 top-[130%] rounded-lg" >
                <ul className="w-full">
                  <li className="w-full px-6 py-5 border-b-2 border-b-lightgreen">
                    <div className="flex justify-start items-center gap-6">
                      <img src="/chainsaw-man.jpg" alt="" className="w-[55px] h-[55px] rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="text-[20px]">Seiya Tagami</span>
                        <span>example@gmail.com</span>
                      </div>
                    </div>
                  </li>
                  <li className="w-full px-6 py-4 border-b border-b-lightgreen hover:bg-darkblue-sub">
                    <div className="flex items-center justify-start gap-6">
                      <HistoryIcon className="scale-125" />
                      <span className="font-bold">History</span>
                    </div>
                  </li>
                  <li className="w-full px-6 py-4 border-b border-b-lightgreen hover:bg-darkblue-sub">
                    <div className="flex items-center justify-start gap-6">
                      <EditIcon className="scale-125" />
                      <span className="font-bold">Edit profile</span>
                    </div>
                  </li>
                  <li className="w-full px-6 py-4 border-b border-b-lightgreen hover:bg-darkblue-sub">
                    <div className="flex items-center justify-start gap-6">
                      <LogoutIcon className="scale-125" />
                      <span className="font-bold">Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header