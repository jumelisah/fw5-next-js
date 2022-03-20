import Layout from "../components/Layout"
import ProfileModule from "../components/ProfileModule"
import Sidebar from "../components/SideBar"

const Profile = () => {
  const data = ['Personal Information', 'Change Password', 'Change PIN', 'Logout']
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            {data.map((x)=>{
              {console.log(data, x)}
              return(
                <div key={x}>
                  <ProfileModule>{x}</ProfileModule>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile