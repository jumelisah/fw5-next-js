import Image from "next/image"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import styles from "../styles/Dashboard.module.css"

const History = () =>{
  const transHistory = [
    {id: 1, name: 'Samuel Suhi', type: 'Accept', sum: 50000},
    {id: 2, name: 'Samuel Suhi', type: 'Accept', sum: 50000},
    {id: 3, name: 'Samuel Suhi', type: 'Accept', sum: 50000},
    {id: 4, name: 'Samuel Suhi', type: 'Accept', sum: 50000},
    {id: 5, name: 'Samuel Suhi', type: 'Accept', sum: 50000},
    {id: 6, name: 'Samuel Suhi', type: 'Accept', sum: 50000}
  ]
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white mt-4 mt-md-0 p-3' style={{borderRadius: '10px'}}>
            <h1 className='fs-3'>Transaction History</h1>
              {transHistory.map((data)=> {
                return(
                  <div className='mt-4' key={data.id} style={{listStyle: 'none'}}>
                  <div className='d-flex align-items-center position-relative'>
                    <Image src='/images/user.png' alt='user' width={40} height={40} layout='fixed'/>
                    <div className='ms-2'>
                      <p className='m-0 p-0'>{data.name}</p>
                      <p className='m-0 p-0'>{data.type}</p>
                    </div>
                    <div className='position-absolute top-50 end-0 translate-middle-y'>
                      {data.sum}
                    </div>
                  </div>
                </div>
                )
              })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default History