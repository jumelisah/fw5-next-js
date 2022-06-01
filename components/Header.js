import Button from "./Button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiBell } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { getPhoneNumber } from "../redux/actions/auth"

const Header = () => {
  const {auth} = useSelector(state => state)
  const [isLogin, setIsLogin] = useState(true)
  const [userData, setUserData] = useState()
  const dispatch = useDispatch()
  useEffect (()=> {
    const token = window.localStorage.getItem('beWalletToken')
    setUserData(JSON.parse(window.localStorage.getItem('beWalletUser')))
    if(token){
      dispatch(getPhoneNumber(token))
    }else{
      setIsLogin(false)
    }
  }, [dispatch])
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-color7 position-fixed top-0 col-12" style={{zIndex: 999}}>
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
          {isLogin && userData &&
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item m-2">
              <Link href='/profile' passHref>
              <a><Image src={userData?.picture || '/images/default-user.png'} alt='user' width={45} height={45} layout='fixed' objectFit='cover' onError={e => e.target.src='/images/default-user.png'} className="rounded-3"/></a>
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link href='/profile' passHref>
                <a style={{textDecoration: 'none'}}>
                  <p className="py-0 my-0 text-color3">{userData?.fullName}</p>
                  <p className="py-0 my-0 text-color3">{auth.phones.length>0 ? `+62${parseInt(auth.phones[0].number)}` : userData?.email}</p>
                </a>
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link href='/profile' passHref>
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