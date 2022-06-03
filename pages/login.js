import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Title from '../components/Title';

const Login = () => {
  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [itsError, setItsError] = useState(false)

  useEffect ( () => {
    if (router.query.email) {
      setEmail(router.query.email)
      console.log(router.query.email)
    }
    if(!email || !password){
      setItsError(true)
    }
    if (auth.token) {
      router.push('/dashboard')
    }
    if(!auth.successMsg) {
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
    }
  }, [router, email, password, dispatch, auth.successMsg, auth.token])

  const onLogin = async(e) => {
    e.preventDefault()
    dispatch(login(email, password))
    setItsError(true)
  }
  return(
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0 position-relative'>
      <Title title="Login"/>
      <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100`}>
        <div className='px-md-5'>
        <Link href='/'>
          <a className='text-color1 fs-3 fw-bold' style={{textDecoration: 'none'}}>Be Wallet</a>
        </Link>
        <div className='text-center mx-auto' style={{maxWidth: '300px'}}>
          <Image src='/images/Group57.png' alt='background phone' width={250} height={250} layout='fixed' objectFit='cover' />
        </div>
          <h1 className='fs-5 fw-bold py-2'>App that Covering Banking Needs.</h1>
          <p style={{maxWidth: '500px'}}>Be Wallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Be Wallet everyday with worldwide users coverage.</p>
        </div>
      </div>
      <div className='right-section col-12 col-md-5 px-3 px-lg-5 py-5 py-md-0 d-flex justify-content-center align-items-center vh-100'>
        <div className='container'>
          <h1 className='fs-4 fw-bold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
          <p className='py-4 m-0'>Transfering money is eassier than ever, you can access BeWallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          <Form onSubmit={onLogin}>
            <FormInput type='email'
            name='email'
            icon={<AiOutlineMail className={`${itsError && auth.errMessage ? 'text-danger' : email ? 'text-color4' : ''}`}/>}
            placeholder='Enter your e-mail' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : email ? 'border-color4 text-color4' : ''}`}
            onChange={e=>setEmail(e.target.value)}/>
            <FormInput type='password'
            name='password'
            icon={<FiLock className={`${itsError && auth.errMessage ? 'text-danger' : password ? 'border-color4 text-color4' : ''}`}/>}
            placeholder='Enter your password' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : password ? 'border-color4 text-color4' : ''}`}
            onChange={e=>setPassword(e.target.value)}/>
            <div className='text-md-end'>
            <Link href='/reset-password'>
              <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
            </Link>
            </div>
            <div className={`text-danger text-center ${itsError && auth.errMessage ? 'visible' : 'invisible'}`} style={{height: '40px'}}>
              <p>{auth.errMessage}</p>
            </div>
            <div className='my-4 p-0'>
              <Button variant={`${email && password ? 'bg-color3 text-white' : 'bg-secondary'}`}>Login</Button>
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

export default Login