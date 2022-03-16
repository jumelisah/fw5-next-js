import Button from "./Button"
import Image from "next/image"

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="#">
          <Image src="/images/bw.png" alt="logo" width={70} height={70}/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item m-2">
              <Button variant='bg-light' style={{width: "150px"}}>Login</Button>
            </li>
            <li className="nav-item m-2">
              <Button variant='bg-color1 text-light' style={{width: "150px"}}>Signup</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header