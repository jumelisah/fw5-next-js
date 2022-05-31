import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import styles from "../styles/Dashboard.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getBalance, getUserData } from "../redux/actions/auth"
import { useRouter } from "next/router"
import { getHistory } from "../redux/actions/transactions"
import { getAllUser } from "../redux/actions/users"
import { DataHistory } from "../components/History"
import BarChart from "../components/Chart"
import Title from "../components/Title"

const Dashboard = () => {
  const {auth, transactions, users} = useSelector(state => state)
  const [histories, setHistories] = useState()
  const [income, setIncome] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    setHistories(JSON.parse(window.localStorage.getItem('beWalletHistory')))
    if(!token){
      router.push('/login')
    }else{
      dispatch(getUserData(token))
      dispatch(getBalance(token))
      dispatch(getHistory(token))
      dispatch(getAllUser(token))
    }
  }, [router, dispatch])
  const totalIncome = () => {
    let income = 0
    transactions.history.forEach(el => {
      if ((el.userId === auth.user.id && el.typeId === 1) || el.userId !== auth.user.id){
        income += el.amount
      }
    });
     return income
  }
  const totalExpense = () => {
    let expense = 0
    transactions.history.forEach(el => {
      if (el.userId === auth.user.id && el.typeId !== 1){
        expense += el.amount
      }
    });
    return expense
  }
  return(
    <Layout>
      <Title title="Dahboard" />
      <div className='container d-flex flex-column flex-md-row bg-color6 mb-5'>
        <div className='col-12 col-md-3'><Sidebar /></div>
        <div className='col-12 col-md-9 ms-md-3 me-0 overflow-auto' style={{height: '500px'}}>
          <div className={`${styles.roundedten} col-12 bg-color4 text-white my-3 mt-md-0 px-3 py-4`}>
            <p className='p-0 m-0'>Balance</p>
            <h3>Rp {Number(auth.balance).toLocaleString('id-ID')}</h3>
            <p className='p-0 m-0'>{auth.phones.length>0 ? auth.phones[0].number : auth.user.email}</p>
          </div>
          <div className='col-12 d-flex flex-column flex-md-row p-0 m-0'>
            <div className='col-12 col-md-6 pe-2'>
              <div className={`${styles.roundedten} bg-white shadow p-3`} style={{height: '100%'}}>
                <BarChart data={[100000,50000,200000,300000,200, -200000]} labels={['1','2','3','4','5','6','7']} income={totalIncome()} expense={totalExpense()}/>
              </div>
            </div>
            <div className='col-12 col-md-6 ps-md-2 mt-3 mt-md-0'>
              <div className={`${styles.roundedten} bg-white shadow p-3`} style={{height: '100%'}}>
                <h3 className='fs-5'>Transaction History</h3>
                <div className='overflow-auto' style={{maxHeight: '285px'}}>
                  <DataHistory dataHistory={transactions.history} dataUser={users.userList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard