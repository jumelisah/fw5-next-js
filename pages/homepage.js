import { useEffect } from "react"
import Button from "../components/Button"
import styles from '../components/Button.module.css'

const Homepage = () =>{
  return(
    <div>
      <h1>HOMEPAGE</h1>
      <div className='row'>
        <div className='col-8'>
          <Button variant="bg-light">Login</Button>
        </div>
      </div>
      <Button variant="bg-color1 text-light">Signup</Button>
      <div className='bg-color1 text-light'>
        <h2>Halo</h2>
      </div>
    </div>
  )
}

export default Homepage