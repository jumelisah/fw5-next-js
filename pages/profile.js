import Image from "next/image"
import Layout from "../components/Layout"
import ProfileModule from "../components/ProfileModule"
import Sidebar from "../components/SideBar"
import { RiPencilLine } from "react-icons/ri"
import Link from "next/link"
import auth from "../redux/reducers/auth"
import { useSelector } from "react-redux"

const Profile = () => {
  const {auth} = useSelector(state => state)
  const data = [
    {title: 'Personal Information', url: '/personal-information'},
    {title: 'Change Password', url: '/change-password'},
    {title: 'Change PIN', url: '/change-pin'},
    {title: 'Logout', url: '/logout'},
  ]
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white pt-5'>
            <div className='text-center'>
              <Image src='/images/user.png' alt='user' width={60} height={60} />
              <p><RiPencilLine /> Edit</p>
              <p>{auth.user.fullName}</p>
              <p>+62 813-9387-7946</p>
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