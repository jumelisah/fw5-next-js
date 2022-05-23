import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth';
import { Router, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { forgotPassword } from '../redux/actions/auth';

const ResetPassword = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const route = useRouter()
  const [itsError, setItsError] = useState(false)
  const [email, setEmail] = useState()
  // const navigate = useNavigate()

  useEffect ( () => {
  const token = window.localStorage.getItem('beWalletToken')
    if(token){
      route.push('/dashboard')
    }
    if(!email){
      setItsError(true)
    }
  }, [route, email])

  // const onLogin = (e) => {
  //   e.preventDefault()
  //   const email = e.target.elements['email'].value
  //   const password = e.target.elements['password'].value
  //   dispatch(login(email, password))
  //   route.push('/dashboard')
  // }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    setItsError(true)
  }
  return(
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0'>
      <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100`}>
        <div className='px-md-5'>
        <Link href='/'>
          <a className='text-color1 fs-3 fw-bold' style={{textDecoration: 'none'}}>Zwallet</a>
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
          <h1 className='fs-4 fw-bold'>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h1>
          <p className='py-4 m-0'>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
          <Form onSubmit={handleForgotPassword}>
            <FormInput type='email' name='email' icon={<AiOutlineMail className={`${itsError && auth.errMessage ? 'text-danger' : email ? 'text-color4' : ''}`}/>} placeholder='Enter your e-mail' variant={`ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : email ? 'border-color4 text-color4' : ''}`} value={email} onChange={e => setEmail(e.target.value)}/>
            <div className='text-end'>
              <Link href='/'>
                <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
              </Link>
            </div>
            <div className={`text-danger text-center ${itsError && auth.errMessage ? 'visible' : 'invisible'}`} style={{height: '40px'}}>
              <p>{auth.errMessage}</p>
            </div>
            <div className={`text-color4 text-center ${auth.successMsg ? 'visible' : 'invisible'}`} style={{height: '40px'}}>
              <p>{auth.successMsg}</p>
            </div>
            <div className='my-4 p-0'>
              <Button variant='bg-secondary border-0'>Confirm</Button>
            </div>
          </Form>
            <p>Don’t have an account? Let’s 
              <Link href='/register'>
                <a className='text-color5' style={{textDecoration: 'none'}}> Sign Up</a>
              </Link></p>
        </div>
      </div>
      {auth.isLoading &&
      <div className='bg-secondary bg-opacity-10 position-absolute top-0 d-flex justify-content-center align-items-center vh-100 vw-100'>
        <div>
          <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />
        </div>
      </div>}
    </div>
  )
}

export default ResetPassword