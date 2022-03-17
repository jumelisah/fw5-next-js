import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'

const Login = () => {
  return(
    <div className='row p-0 m-0'>
      <div className={`${styles.leftSection} left-section col-7 p-0 d-none d-sm-block`}>
        {/* <Image src='/images/bg-login.png' alt='background login' width={100} height={100} layput='responsive' sizes='100vw' /> */}
      </div>
      <div className='right-section col-12 col-md-5 p-0 d-flex justify-content-center align-items-center vh-100'>
        <div className='container'>
          <h1 className='fs-3 fw-bold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
          <p>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          <Form>
            <FormInput icon={<AiOutlineMail />} placeholder='Enter your e-mail' variant='border-0 border-bottom' />
            <FormInput icon={<FiLock />} placeholder='Enter your password' variant='border-0 border-bottom' />
            <Link href='/'>
              <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
            </Link>
            <Button variant='bg-secondary border-0'>Login</Button>
          </Form>
            <p>Don’t have an account? Let’s 
              <Link href='/'>
                <a className='text-color5' style={{textDecoration: 'none'}}> Sign Up</a>
              </Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login