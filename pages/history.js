import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataHistory } from "../components/History"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import Title from "../components/Title"
import { useRouter } from "next/router"
import { getHistory } from "../redux/actions/transactions"

const History = () =>{
  const {transactions} = useSelector(state => state)
  const [users, setUsers] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = window.localStorage.getItem('beWalletToken')
    setUsers(JSON.parse(window.localStorage.getItem('beWalletUsers')))
    if(!token){
      router.push('/login')
    }
    dispatch(getHistory(token))
  }, [router, dispatch])
  return(
    <Layout>
      <Title title="History" />
      <div className='container mb-3'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white mt-4 mt-md-0 p-3 shadow' style={{borderRadius: '10px', height: 500}}>
            <h1 className='fs-3'>Transaction History</h1>
            <div className='overflow-auto mt-3' style={{maxHeight: '400px'}}>
              <DataHistory dataHistory={transactions.history} dataUser={users} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default History