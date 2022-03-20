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
import OtpInput from 'react-otp-input';

const CreatePin = ({auth}) => {
  const dispatch = useDispatch()
  const route = useRouter()
  const [state, setState] = useState({otp: null})
  const handleChange = (otp) => setState({ otp });
  
  // const navigate = useNavigate()

  useEffect ( () => {
    console.log(auth)
  }, [auth])

  const onLogin = () => {
    console.log(auth.userForm)
  }
  return(
    <div className='d-flex flex-column-reverse flex-md-row p-0 m-0'>
      <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100`}>
        <div className='px-md-5'>
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
          <h1 className='fs-4 fw-bold'>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h1>
          <p className='py-4 m-0'>Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</p>
          <Form onSubmit={onLogin}>
          <OtpInput
          value={state.otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span>-</span>}
          />
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

const mapStateToProps = (state) => ({auth: state.auth})
export default connect(mapStateToProps)(CreatePin)