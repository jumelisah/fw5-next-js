import Link from "next/link"
import styles from './SideBar.module.css'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiGrid } from "react-icons/fi"
import { BsPlus } from "react-icons/bs"
import { AiOutlineArrowUp } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { useDispatch } from "react-redux"

const Sidebar = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  const [linkActive, setLinkActive] = useState('/')
  useEffect (() => {
    setLinkActive(route.pathname)
  }, [route.pathname])
  const dataLink = [
    {url: '/dashboard', name: 'Dashboard', icon: FiGrid},
    {url: '/transfer', name: 'Transfer', icon: AiOutlineArrowUp},
    {url: '/topup', name: 'Top up', icon: BsPlus},
    {url: '/profile', name: 'Profile', icon: BiUser},
    {url: '', name: 'Logout', icon: FiLogOut}
  ]
  const onLogout = ()=>{
    dispatch({type: 'AUTH_LOGOUT'})
    route.push('/')
  }
  
  return(
    <div className={`${styles.roundedten} container bg-white px-0`} style={{height: '500px'}}>
      <ul className="menu px-0 py-3 position-relative" style={{height: '100%'}}>
        {dataLink.map(item => {
          const Icon = item.icon
          return (
          <li key={item.name} className={`py-3 ${item.url===''? 'position-absolute bottom-0 translate-middle-y' : ''}`} style={{listStyle: 'none'}}>
            {item.url!=='' &&
            <Link href={`${item.url}`}>
              <a className={`border-start border-4 ${linkActive===item.url?'text-color4 border-color4':'text-secondary border-secondary'} ps-3`} style={{textDecoration: 'none'}}>
                <Icon className='me-3' />
                {item.name}
              </a>
            </Link>}
            {item.url==='' &&
            <div onClick={onLogout}>
            <a className={`border-start border-4 ${linkActive===item.url?'text-color4 border-color4':'text-secondary border-secondary'} ps-3`} style={{textDecoration: 'none'}}>
              <Icon className='me-3' />
              {item.name}
            </a>
          </div>}
          </li>
          )
        })}
      </ul>
    </div>
  )

}

export default Sidebar