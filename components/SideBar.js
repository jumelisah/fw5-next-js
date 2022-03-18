import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiGrid } from "react-icons/fi"
import { BsPlus } from "react-icons/bs"
import { AiOutlineArrowUp } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"

const Sidebar = () => {
  const route = useRouter()
  const [linkActive, setLinkActive] = useState('/')
  useEffect (() => {
    setLinkActive(route.pathname)
  }, [route.pathname])
  const dataLink = [
    {url: '/homepage', name: 'Dashboard', icon: FiGrid},
    {url: '/transfer', name: 'Transfer', icon: AiOutlineArrowUp},
    {url: '/topup', name: 'Top up', icon: BsPlus},
    {url: '/profile', name: 'Profile', icon: BiUser},
    {url: '/logout', name: 'Logout', icon: FiLogOut}
  ]
  return(
    <ul className="menu my-3 position-relative vh-100">
      {dataLink.map(item => {
        const Icon = item.icon
        {console.log(item.url, linkActive, route)}
        return (
        <li key={item.name} className={`py-3 ${item.url==='/logout'? 'position-absolute bottom-0 translate-middle-y' : ''}`} style={{listStyle: 'none'}}>
          <Link href={`${item.url}`}>
            <a className={`border-start border-4 ${linkActive===item.url?'text-color4 border-color4':'text-secondary border-secondary'} ps-3`} style={{textDecoration: 'none'}}>
              <Icon className='me-3' />
              {item.name}
            </a>
          </Link>
        </li>
        )
      })}
    </ul>
  )

}

export default Sidebar