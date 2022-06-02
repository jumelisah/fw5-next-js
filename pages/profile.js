import Image from "next/image"
import Layout from "../components/Layout"
import ProfileModule from "../components/ProfileModule"
import Sidebar from "../components/SideBar"
import { RiPencilLine } from "react-icons/ri"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Title from "../components/Title"
import SideBarLayout from "../components/SidebarLayout"
import { updateProfile } from "../redux/actions/auth"

const Profile = () => {
  const {auth} = useSelector(state => state)
  const [userData, setUserData] = useState()
  const [image, setImage] = useState()
  const [picture, setPicture] = useState()
  const dispatch = useDispatch()
  const router = useRouter()

  const data = [
    {title: 'Personal Information', url: '/personal-information'},
    {title: 'Change Password', url: '/change-password'},
    {title: 'Change PIN', url: '/change-pin'},
    {title: 'Logout', url: '/logout'},
  ]
  useEffect(() => {
    if (!image) {
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
    }
    const token = window.localStorage.getItem('beWalletToken')
    setUserData(JSON.parse(window.localStorage.getItem('beWalletUser')))
    if(!token){
      router.push('/login')
    }else{
      if (image && image.size <= 2097152 && (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png')){
        console.log(image)
        dispatch(updateProfile({picture: image}, token))
        setImage()
      }
    }
  }, [dispatch, router, auth.isLoading, picture, image])
	const onFileChange = e => {
		setImage(e.target.files[0])
		setPicture(URL.createObjectURL(e.target.files[0]))
	}
  return(
    <>
    <SideBarLayout>
      <div>
        <div className='pt-5'>
          <div className='text-center'>
            <Image className='rounded ' src={auth.isLoading? '/images/loading-buffering.gif' : picture ? picture : userData?.picture ? userData.picture : '/images/default-user.png'} alt='user' width={60} height={60} layout='fixed' objectFit='cover' />
            <div className="position-relative">
              <p style={{cursor: 'pointer'}}><RiPencilLine /> Edit</p>
              <input className="position-absolute top-0 start-50 translate-middle-x opacity-0" type="file" onChange={onFileChange} onError={e => e.target.value(userData.picture)} style={{width: '100px', cursor: 'pointer'}}/>
            </div>
            {image && (image?.type !== 'image/jpeg' && image?.type !== 'image/jpg' && image?.type !== 'image/png') && <p className="text-danger">You can only upload .jpg, .jpeg or .png file</p>}
            {image?.size > 2097152 && <p className="text-danger">File too large. Max size allowed: 2MB</p>}
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
    </SideBarLayout>
    <Layout>
      <Title title="Profile" />
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Profile