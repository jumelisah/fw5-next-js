import Button from "./Button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiBell } from "react-icons/fi"

const Header = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-color7">
      <div className="container">
        <Link  href='/'>
          <a className="navbar-brand fs-3 fw-bold text-color3">Zwallet</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!isLogin &&
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item m-2">
              <Link href='/login' passHref>
                <Button variant='bg-color7' style={{width: "150px"}}>Login</Button>
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link href='/register' passHref>
                <Button variant='bg-color1 text-light' style={{width: "150px"}}>Signup</Button>
              </Link>
            </li>
          </ul>}
          {isLogin &&
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item m-2">
              <Link href='/login' passHref>
              <a><Image src='/images/user.png' alt='user' width={45} height={45}/></a>
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link href='/register' passHref>
                <a style={{textDecoration: 'none'}}>
                  <p className="py-0 my-0 text-color3">Robert Chandler</p>
                  <p className="py-0 my-0 text-color3">+62 8139 3877 7946</p>
                </a>
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link href='/register' passHref>
                <a><FiBell /></a>
              </Link>
            </li>
          </ul>}
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header