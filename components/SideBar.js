import Link from "next/link"
import styles from './SideBar.module.css'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiGrid } from "react-icons/fi"
import { BsPlus } from "react-icons/bs"
import { AiOutlineArrowUp, AiOutlineMenu } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { IoChevronDownCircleSharp } from "react-icons/io5"

const Sidebar = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  const [linkActive, setLinkActive] = useState('/')
  const [showMenu, setShowMenu] = useState(false)
  useEffect (() => {
    setLinkActive(route.pathname.split('/')[1])
  }, [route.pathname])
  const dataLink = [
    {url: 'dashboard', name: 'Dashboard', icon: FiGrid},
    {url: 'transfer', name: 'Transfer', icon: AiOutlineArrowUp},
    {url: 'topup', name: 'Top up', icon: BsPlus},
    {url: 'profile', name: 'Profile', icon: BiUser},
    {url: '', name: 'Logout', icon: FiLogOut}
  ]
  const onLogout = ()=>{
    dispatch({type: 'AUTH_LOGOUT'})
    route.push('/')
  }
  
  return(
    <div className={`${styles.roundedten} position-relative container bg-white px-0 py-3 shadow`} style={{height: '100%'}}>
      <div className="d-flex d-md-none align-items-center px-3 my-3 border-start border-4" style={{cursor: "pointer"}} onClick={() => setShowMenu(!showMenu)}>
        <AiOutlineMenu />
        <p className="text-color4 p-0 m-0 ps-3">Menu</p>
        <IoChevronDownCircleSharp className="ms-auto"/>
      </div>
      <ul className={`menu px-0 position-relative ${showMenu ? 'd-block' : 'd-none'} d-md-block`}>
        {dataLink.map(item => {
          const Icon = item.icon
          return (
          <li key={item.name} className={`py-3 ${item.url===''? 'position-absolute bottom-0 translate-middle-y' : ''}`} style={{listStyle: 'none'}}>
            {item.url!=='' &&
            <Link href={`/${item.url}`}>
              <a className={`border-start border-4 ${linkActive===item.url ? 'text-color4 border-color4':'text-secondary border-secondary'} ps-3`} style={{textDecoration: 'none'}}>
                <Icon className='me-3' />
                {item.name}
              </a>
            </Link>}
          </li>
          )
        })}
      </ul>
      <div className={`d-none d-md-block position-absolute bottom-0 mb-3`} onClick={onLogout} style={{cursor: 'pointer'}}>
        <div className='border-start border-4 text-secondary border-secondary ps-3 d-flex align-items-center'>
          <FiLogOut />
          <p className='m-0 p-0 ms-3'>Logout</p>
        </div>
      </div>
      {showMenu && <div className={`d-block d-md-none pb-3`} onClick={onLogout} style={{cursor: 'pointer'}}>
        <div className='border-start border-4 text-secondary border-secondary ps-3 d-flex align-items-center'>
          <FiLogOut />
          <p className='m-0 p-0 ms-3'>Logout</p>
        </div>
      </div>}
    </div>
  )

}

export default Sidebar