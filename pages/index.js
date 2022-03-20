import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'
import About from '../components/About'
import Layout from '../components/Layout'
import { BsTelephone } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { BsDownload } from "react-icons/bs" 
import Otp from '../components/Otp'
import BarChart from '../components/Chart'

export default function Home() {
  return (
    <Layout>
    <div className='container'>
      
      <div className='top-wrapper d-flex flex-column-reverse flex-md-row justify-content-center align-items-center'>
        <div className='left-section col-md-6'>
          <Image src='/images/png-phone.png' alt='phone' width={250} height={600} layout='fixed' priority/>
        </div>
        <div className='right-side col-12 col-md-6'>
          <h1 className='fw-bolder'>Awesome App</h1>
          <h1 className='fw-bolder'>For Saving <span className='text-color4'>Time.</span></h1>
          <p className='py-4 lh-lg'>We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
          <Button variant='bg-color1 text-white' style={{width: '150px'}}>Try it free</Button>
          <p className='pt-5 pb-3'>Available on</p>
          <div className='d-flex m-0'>
            <div className='me-4'>
              <Image src='/images/playstore.png' alt='playstore' width={30} height={30} />
            </div>
            <div>
              <Image src='/images/appstore.png' alt='appstore' width={30} height={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-color6'>
      <div className='container'>
        <div className='row py-5'>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/msIcon.png' width={50} height={50} alt='microsoft'/>
          </div>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/dropbox.png' width={50} height={50} alt='dropbox'/>
          </div>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/hnm.png' width={50} height={50} alt='hnm'/>
          </div>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/airbnb.png' width={50} height={50} alt='airbnb'/>
          </div>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/canon.png' width={50} height={50} alt='canon'/>
          </div>
          <div className='col-6 col-md-2 my-2 text-center'>
            <Image src='/images/dell.png' width={50} height={50} alt='canon'/>
          </div>
        </div>
      </div>
    </div>
    <div className='container text-center py-5'>
      <h1 className='fw-bolder my-5'><span className='text-color4'>About</span> the Application.</h1>
      <p className='mx-auto lh-lg' style={{maxWidth: '500px'}}>We have some great features from the application and it’s totally free to use by all users around the world.</p>
      <div className='row my-5'>
        <div className='col-12 col-md-4'>
          <About subTitle='24/7 Support' icon={<BsTelephone />} variant='bg-color7'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</About>
        </div>
        <div className='col-12 col-md-4'>
          <About subTitle='Data Privacy' icon={<FiLock />} variant='bg-white'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</About>
        </div>
        <div className='col-12 col-md-4'>
          <About subTitle='Easy Download' icon={<BsDownload />} variant='bg-color7'>BeWallet is 100% totally free to use it’s now available on Google Play Store and App Store.</About>
        </div>
      </div>
    </div>
    <Otp />
    <BarChart data={[10,50,200,300]} labels={['1','2','3','4']} income={0} expense={0}/>
    </Layout>
  )
}
