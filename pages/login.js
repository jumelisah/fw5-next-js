import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { connect, useDispatch } from 'react-redux';
import { login } from '../redux/actions/auth';

const Login = () => {
  // const dispatch = useDispatch()
  const onLogin = (e) => {
    e.preventDefault()
    const email = e.target.elements['email'].value
    const password = e.target.elements['password'].value
    login(email, password)
  }
  return(
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0'>
      <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100`}>
        <div className='px-5'>
        <Link href='/'>
          <a>
            <Image src='/images/bw.png' alt='logo' width={30} height={30} className={`${styles.logo}`}/>
          </a>
        </Link>
        <div className='text-center mx-auto' style={{maxWidth: '300px'}}>
          <Image src='/images/Group57.png' alt='background phone' width={200} height={200} layout='responsive' priority />
        </div>
          <h1 className='fs-5 fw-bold py-2'>App that Covering Banking Needs.</h1>
          <p style={{maxWidth: '500px'}}>Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.</p>
        </div>
      </div>
      <div className='right-section col-12 col-md-5 px-3 px-lg-5 py-5 py-md-0 d-flex justify-content-center align-items-center vh-100'>
        <div className='container'>
          <h1 className='fs-4 fw-bold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
          <p className='py-4 m-0'>Transfering money is eassier than ever, you can access BeWallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          <Form onSubmit={onLogin}>
            <FormInput type='email' name='email' icon={<AiOutlineMail />} placeholder='Enter your e-mail' variant='border-0 border-bottom' />
            <FormInput type='password' name='password' icon={<FiLock />} placeholder='Enter your password' variant='border-0 border-bottom' />
            <div className='text-end'>
              <Link href='/'>
                <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
              </Link>
            </div>
            <div className='my-4 p-0'>
              <Button variant='bg-secondary border-0'>Login</Button>
            </div>
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