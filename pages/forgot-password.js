import { Form } from 'react-bootstrap'
import FormInput from '../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createNewPassword } from '../redux/actions/auth';
import Title from '../components/Title';

const CreateNewPassword = ({auth}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [errMessage, setErrMessage] = useState()
  
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    if(!newPassword || !confirmPassword){
      setIsError(true)
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
    }
    if (auth.successMsg) {
      router.push('/login')
    }
    if (token) {
      router.push('/dashboard')
    }
  }, [router, newPassword, confirmPassword, dispatch, auth.successMsg])

  const onNewPassword = (e) => {
    e.preventDefault()
    setErrMessage()
    if(!newPassword || !confirmPassword) {
      setErrMessage('Input new password!')
    }else if(newPassword!==confirmPassword){
      setErrMessage('Password not match')
    }else{
      const data = {
        otp: router.query.otp,
        newPassword, confirmPassword
      }
      dispatch(createNewPassword(data))
    }
  }

  const closeErr = () => {
    setIsError(false)
  }
  return(
    <>
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0 position-relative'>
      <Title title="Forgot Password" />
      <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100`}>
        <div className='px-md-5'>
        <Link href='/'>
          <a className='text-color1 fs-3 fw-bold' style={{textDecoration: 'none'}}>Be Wallet</a>
        </Link>
        <div className='text-center mx-auto' style={{maxWidth: '300px'}}>
          <Image src='/images/Group57.png' alt='background phone' width={200} height={200} layout='responsive' priority />
        </div>
          <h1 className='fs-5 fw-bold py-2'>App that Covering Banking Needs.</h1>
          <p style={{maxWidth: '500px'}}>Be Wallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Be Wallet everyday with worldwide users coverage.</p>
        </div>
      </div>
      <div className='right-section col-12 col-md-5 px-3 px-lg-5 py-5 py-md-0 d-flex justify-content-center align-items-center vh-100'>
        <div className='container'>
          <h1 className='fs-4 fw-bold'>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h1>
          <p className='py-4 m-0'>Now you can create a new password for your Be Wallet account. Type your password twice so we can confirm your new passsword.</p>
          <Form onSubmit={onNewPassword}>
            <FormInput type='password' name='newPassword'  icon={<FiLock className={`${(isError && auth.errMessage) || errMessage ? 'text-danger' : newPassword ? 'border-color4 text-color4' : ''}`}/>} placeholder='Create New Password' required variant={`ps-4 ${(isError && auth.errMessage) || errMessage ? 'border-danger text-danger' : newPassword ? 'border-color4 text-color4' : ''}`} value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <FormInput type='password' name='confirmPassword'  icon={<FiLock className={`${(isError && auth.errMessage) || errMessage ? 'text-danger' : confirmPassword ? 'border-color4 text-color4' : ''}`}/>} placeholder='Confirm New Password' required variant={`ps-4 ${(isError && auth.errMessage) || errMessage ? 'border-danger text-danger' : confirmPassword ? 'border-color4 text-color4' : ''}`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <div className='text-end'>
              <Link href='/'>
                <a className='text-dark' style={{textDecoration: 'none'}}>Back to home</a>
              </Link>
            </div>
            <div className={`text-danger text-center ${errMessage ? 'visible' : 'invisible'}`} style={{height: '40px'}}>
              <p>{errMessage}</p>
            </div>
            <div className={`text-danger text-center ${isError && auth.errMessage ? 'visible' : 'invisible'}`} style={{height: '40px'}}>
              <p>{auth.errMessage}</p>
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
    </>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
export default connect(mapStateToProps)(CreateNewPassword)