import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi'
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { connect, useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Otp from '../components/Otp';

const CreatePin = () => {
  const {auth} = useSelector(state => state)
  const [pin, setPin] = useState()
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() =>{
    if (!auth.userForm.email){
      router.push('/register')
    }
    if(auth.message === "Register success"){
      router.push(`/login?email=${auth.userForm.email}`)
    }
  }, [auth, router])
  const onRegister = (e) => {
    e.preventDefault()
    const data = {
      fullName: auth.userForm.fullName,
      email: auth.userForm.email,
      password: auth.userForm.password,
      pin
    }
    dispatch(register(data))
    // router.push('/login')
  }
  return(
    // <div className='d-flex flex-column-reverse flex-md-row p-0 m-0'>
    //   <Title title="Create PIN" />
    //   <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-none d-md-flex align-items-center vh-md-100 position-fixed`}>
    //     <div className='px-md-5'>
    //     <Link href='/'>
    //       <a className='text-color1 fs-3 fw-bold' style={{textDecoration: 'none'}}>Be Wallet</a>
    //     </Link>
    //     <div className='text-center mx-auto' style={{maxWidth: '300px'}}>
    //       <Image src='/images/Group57.png' alt='background phone' width={200} height={200} layout='responsive' priority />
    //     </div>
    //       <h1 className='fs-5 fw-bold py-2'>App that Covering Banking Needs.</h1>
    //       <p style={{maxWidth: '500px'}}>Be Wallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.</p>
    //     </div>
    //   </div>
    //   <div className='right-section ms-auto col-12 col-md-5 px-3 px-lg-5 py-5 d-flex'>
    //     <div className='container'>
    //       <h1 className='fs-4 fw-bold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
    //       <p className='py-4 m-0'>Transfering money is eassier than ever, you can access BeWallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          // <Form onSubmit={onRegister}>
          //   <div className="d-flex justify-content-center align-items-center mb-3">
          //     <Otp value={pin} onChange={otp => setPin(otp)} />
          //   </div>
          //   <div className='text-end'>
          //     <Link href='/'>
          //       <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
          //     </Link>
          //   </div>
          //   <div className='my-4 p-0'>
          //     <Button variant={`${pin && pin.length === 6 ? 'bg-color5 text-white' :'bg-secondary border-0'}`}>Sign Up</Button>
          //   </div>
          // </Form>
    //         <p>Don’t have an account? Let’s 
    //           <Link href='/'>
    //             <a className='text-color5' style={{textDecoration: 'none'}}> Sign Up</a>
    //           </Link></p>
    //     </div>
    //   </div>
    // </div>
    
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0 position-relative'>
      <Title title="Create PIN"/>
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
          <Form onSubmit={onRegister}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <Otp value={pin} onChange={otp => setPin(otp)} />
            </div>
            <div className='text-end'>
              <Link href='/'>
                <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
              </Link>
            </div>
            <div className='my-4 p-0'>
              <Button variant={`${pin && pin.length === 6 ? 'bg-color5 text-white' :'bg-secondary border-0'}`}>Sign Up</Button>
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

export default CreatePin