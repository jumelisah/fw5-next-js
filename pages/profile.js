import Image from "next/image"
import Layout from "../components/Layout"
import ProfileModule from "../components/ProfileModule"
import Sidebar from "../components/SideBar"
import { RiPencilLine } from "react-icons/ri"
import Link from "next/link"
import auth from "../redux/reducers/auth"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Head from "next/head"

const Profile = () => {
  const {auth} = useSelector(state => state)
  const [userData, setUserData] = useState()
  const [image, setImage] = useState()
  const [picture, setPicture] = useState()

  const data = [
    {title: 'Personal Information', url: '/personal-information'},
    {title: 'Change Password', url: '/change-password'},
    {title: 'Change PIN', url: '/change-pin'},
    {title: 'Logout', url: '/logout'},
  ]
  useEffect(() => {
    setUserData(JSON.parse(window.localStorage.getItem('beWalletUser')))
  }, [])
	const onFileChange = e => {
		setImage(e.target.files[0])
		setPicture(URL.createObjectURL(e.target.files[0]))
	}
  return(
    <Layout>
      <Head>
        <title>Profile | Be Wallet</title>
      </Head>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white pt-5'>
            <div className='text-center'>
              <Image className='rounded ' src={picture ? picture : userData?.picture ? userData.picture : '/images/default-user.png'} alt='user' width={60} height={60} layout='fixed' objectFit='cover' />
              <div className="position-relative">
                <p style={{cursor: 'pointer'}}><RiPencilLine /> Edit</p>
                <input className="position-absolute top-0 start-50 translate-middle-x opacity-0" type="file" onChange={onFileChange} style={{width: '100px', cursor: 'pointer'}}/>
              </div>
              <p className="m-0 p-0">{userData?.fullName}</p>
              <p className="m-0 p-0 pb-3">{userData?.email}</p>
            </div>
            {data.map((linkData)=>{
              return(
                <Link href={`/profile${linkData.url}`} key={linkData.title}>
                  <a className='text-white'>
                    <div>
                      <ProfileModule>{linkData.title}</ProfileModule>
                    </div>
                  </a>
                </Link>
                
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile