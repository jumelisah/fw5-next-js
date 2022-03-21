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
import { createNewPassword } from '../redux/actions/auth';
import { ImCross } from 'react-icons/im'

const CreateNewPassword = ({auth}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  
  // const navigate = useNavigate()

  useEffect ( () => {
    console.log(router.query)
    console.log(auth)
  }, [router, auth])

  const onNewPassword = (e) => {
    e.preventDefault()
    const newPassword = e.target.elements['newPassword'].value
    const confirmPassword = e.target.elements['confirmPassword'].value
    if(newPassword!==confirmPassword){
      alert('Password not match')
    }else{
      const data = {
        otp: router.query.otp,
        newPassword, confirmPassword
      }
      console.log(data)
      dispatch(createNewPassword(data))
      if(!auth.isLoading && !auth.isError){
        router.push('/login')
      }else if(auth.isError){
        setIsError(true)
      }
    }
    // dispatch(login(email, password))
    // route.push('/dashboard')
  }

  const closeErr = () => {
    setIsError(false)
  }
  return(
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0 position-relative'>
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
          <p className='py-4 m-0'>Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</p>
          <Form onSubmit={onNewPassword}>
            <FormInput type='password' name='newPassword' icon={<AiOutlineMail />} placeholder='Create New Password' required variant='border-0 border-bottom' />
            <FormInput type='password' name='confirmPassword' icon={<AiOutlineMail />} placeholder='Create New Password' required variant='border-0 border-bottom' />
            <div className='text-end'>
              <Link href='/'>
                <a className='text-dark' style={{textDecoration: 'none'}}>Forgot password?</a>
              </Link>
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
      {isError && <div className='bg-secondary bg-opacity-10 position-absolute top-0 d-flex justify-content-center align-items-center vh-100 vw-100' onClick={closeErr}>
        <div className='bg-white p-3 text-center' style={{borderRadius:'10px', width: '250px'}}>
          <h1 className='text-danger rounded-pill mx-auto' style={{width: '60px', height: '60px', lineHeight: '50px'}}><ImCross /></h1>
          <h1 className='fs-4 text-color3'>ERROR</h1>
          <p>{auth.errMessage}</p>
          </div>
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
export default connect(mapStateToProps)(CreateNewPassword)