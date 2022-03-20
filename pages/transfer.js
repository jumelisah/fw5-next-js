import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"

const Transfer = () => {
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white' style={{borderRadius: '10px'}}></div>
        </div>
      </div>
    </Layout>
  )
}

export default Transfer