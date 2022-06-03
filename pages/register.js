import { useState } from 'react';
import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../components/FormInput'
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi'
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import { registerForm } from '../redux/actions/auth';
import { useRouter } from 'next/router';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const {auth} = useSelector(state => state)
  const [itsError, setItsError] = useState(false)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const navigate = useRouter()
  const dispatch = useDispatch()
  const onRegister = (e) => {
    e.preventDefault()
    if(firstName && email && password && confirmPassword && confirmPassword===password && password?.length >=6){
      const fullName = `${firstName}${lastName ? ` ${lastName}` : ''}`
      const data = {fullName, email, password}
      dispatch(registerForm(data))
      navigate.push('/create-pin')
    }
  }
  return(
    // <div className='d-flex flex-column-reverse flex-md-row p-0 m-0'>
    //   <Title title="Register" />
    //   <div className={`${styles.leftSection} left-section col-12 col-md-7 px-5 d-flex align-items-center vh-md-100 position-fixed`}>
    //     <div className='px-md-5'>
    //     <Link href='/'>
    //       <a className='text-color1 fs-3 fw-bold' style={{textDecoration: 'none'}}>Be Wallet</a>
    //     </Link>
    //     <div className='text-center mx-auto' style={{maxWidth: '300px'}}>
    //       <Image src='/images/Group57.png' alt='background phone' width={200} height={200} layout='responsive' priority />
    //     </div>
    //       <h1 className='fs-5 fw-bold py-2'>App that Covering Banking Needs.</h1>
    //       <p style={{maxWidth: '500px'}}>Be Wallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Be Wallet everyday with worldwide users coverage.</p>
    //     </div>
    //   </div>
    //   <div className='right-section ms-auto col-12 col-md-5 px-3 px-lg-5 py-5 d-flex'>
    //     <div className='container'>
    //       <h1 className='fs-4 fw-bold'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
    //       <p className='py-4 m-0'>Transfering money is eassier than ever, you can access BeWallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
    //       <Form onSubmit={onRegister}>
    //         <FormInput type='text' name='firstName' icon={<BiUser className={`${itsError && auth.errMessage ? 'text-danger' : firstName ? 'text-color4' : ''}`}/>} placeholder='Enter your first name' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : firstName ? 'border-color4 text-color4' : ''}`} value={firstName} onChange={e => setFirstName(e.target.value)} required />
    //         <FormInput type='text' name='lastName' icon={<BiUser className={`${itsError && auth.errMessage ? 'text-danger' : lastName ? 'text-color4' : ''}`}/>} placeholder='Enter your last name' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : lastName ? 'border-color4 text-color4' : ''}`} value={lastName} onChange={e => setLastName(e.target.value)} />
    //         <FormInput type='email' name='email' icon={<AiOutlineMail className={`${itsError && auth.errMessage ? 'text-danger' : email ? 'text-color4' : ''}`}/>} placeholder='Enter your email' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : email ? 'border-color4 text-color4' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required/>
    //         <FormInput type='password' name='password' icon={<FiLock className={`${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'text-danger' : password ? 'text-color4' : ''}`}/>} placeholder='Password' variant={`border-0 border-bottom ps-4 ${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'border-danger text-danger' : password ? 'border-color4 text-color4' : ''}`} value={password} onChange={e => setPassword(e.target.value)} required />
    //         <FormInput type='password' icon={<FiLock className={`${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'text-danger' : confirmPassword ? 'text-color4' : ''}`}/>} placeholder='Confirm password' variant={`border-0 border-bottom ps-4 ${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'border-danger text-danger' : confirmPassword ? 'border-color4 text-color4' : ''}`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
    //         {password && password.length < 6 && <p className='text-danger'>Password should contain 6 characters or more</p>}
    //         {password && confirmPassword && password!==confirmPassword && <p className='text-danger'>Password not match</p>}
    //         <div className='text-end'>
    //         </div>
    //         <div className='my-4 p-0'>
    //           <Button variant={`${firstName && email && password && confirmPassword && confirmPassword===password &&password?.length >=6 ? 'bg-color5 text-white' : 'bg-secondary border-0'}`}>Sign Up</Button>
    //         </div>
    //       </Form>
    //         <p>Have an account? Let’s 
    //           <Link href='/'>
    //             <a className='text-color5' style={{textDecoration: 'none'}}> Login</a>
    //           </Link></p>
    //     </div>
    //   </div>
    // </div>
    
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
          {auth.message && <p className='text-success'>{auth.message}</p>}
          <Form onSubmit={onRegister}>
            <FormInput type='text' name='firstName' icon={<BiUser className={`${itsError && auth.errMessage ? 'text-danger' : firstName ? 'text-color4' : ''}`}/>} placeholder='Enter your first name' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : firstName ? 'border-color4 text-color4' : ''}`} value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <FormInput type='text' name='lastName' icon={<BiUser className={`${itsError && auth.errMessage ? 'text-danger' : lastName ? 'text-color4' : ''}`}/>} placeholder='Enter your last name' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : lastName ? 'border-color4 text-color4' : ''}`} value={lastName} onChange={e => setLastName(e.target.value)} />
            <FormInput type='email' name='email' icon={<AiOutlineMail className={`${itsError && auth.errMessage ? 'text-danger' : email ? 'text-color4' : ''}`}/>} placeholder='Enter your email' variant={`border-0 border-bottom ps-4 ${itsError && auth.errMessage ? 'border-danger text-danger' : email ? 'border-color4 text-color4' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required/>
            <FormInput type='password' name='password' icon={<FiLock className={`${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'text-danger' : password ? 'text-color4' : ''}`}/>} placeholder='Password' variant={`border-0 border-bottom ps-4 ${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'border-danger text-danger' : password ? 'border-color4 text-color4' : ''}`} value={password} onChange={e => setPassword(e.target.value)} required />
            <FormInput type='password' icon={<FiLock className={`${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'text-danger' : confirmPassword ? 'text-color4' : ''}`}/>} placeholder='Confirm password' variant={`border-0 border-bottom ps-4 ${(itsError && auth.errMessage) || (password && confirmPassword && password!==confirmPassword) ? 'border-danger text-danger' : confirmPassword ? 'border-color4 text-color4' : ''}`} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            {password && password.length < 6 && <p className='text-danger'>Password should contain 6 characters or more</p>}
            {password && confirmPassword && password!==confirmPassword && <p className='text-danger'>Password not match</p>}
            <div className='text-end'>
            </div>
            <div className='my-4 p-0'>
              <Button variant={`${firstName && email && password && confirmPassword && confirmPassword===password &&password?.length >=6 ? 'bg-color5 text-white' : 'bg-secondary border-0'}`}>Sign Up</Button>
            </div>
          </Form>
            <p>Have an account? Let’s 
              <Link href='/'>
                <a className='text-color5' style={{textDecoration: 'none'}}> Login</a>
              </Link>
            </p>
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

export default Register