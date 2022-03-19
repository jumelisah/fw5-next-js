import Button from "./Button"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-color7">
      <div className="container">
        <Link  href='/'>
          <a className="navbar-brand">
            <Image src="/images/bw.png" alt="logo" width={70} height={70}/>
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header