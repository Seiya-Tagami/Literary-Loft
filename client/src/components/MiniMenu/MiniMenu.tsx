import React, { useState, useRef, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
import SortIcon from '@mui/icons-material/Sort';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import "./MiniMenu.scss"
import { Link } from 'react-router-dom';


const MiniMenu: React.FC = () => {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const handleClickOutsideOfEl = (e: MouseEvent) => {
      if (!el?.contains(e.target as Node)) {
        console.log('外側です。')
        setActive(false)
      } else {
        console.log('内側です。')
      }
    }

    document.addEventListener("click", handleClickOutsideOfEl);

    return () => {
      document.removeEventListener("click", handleClickOutsideOfEl);
    }
  }, [active])

  return (
    <div className='fixed -bottom-16 -left-16'>
      <div className={`miniMenu ${active && 'active'}`} ref={buttonRef}>
        <div className="miniMenu__toggle" onClick={() => setActive(!active)} >
          <AddIcon className='scale-[200%]' />
        </div>
        <li>
          <Link to="/explore"><ExploreIcon /></Link>
        </li>
        <li>
          <Link to="#"><BookmarkRemoveIcon /></Link>
        </li>
        <li>
          <Link to="#"><SortIcon /></Link>
        </li>
      </div>
    </div>
  )
}

export default MiniMenu