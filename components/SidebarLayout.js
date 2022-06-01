import Layout from "./Layout"
import Sidebar from "./SideBar"

const SideBarLayout = ({children}) => {
  return(
    <Layout>
      <div className='container mb-5'>
        <div className='row py-5'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 m-0 p-0 p-3 py-md-0">
            <div className='bg-white shadow overflow-auto' style={{borderRadius: '10px', height: 500}}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SideBarLayout