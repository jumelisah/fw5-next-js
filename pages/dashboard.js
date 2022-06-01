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
import Link from "next/link"
import SideBarLayout from "../components/SidebarLayout"

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
    histories?.forEach(el => {
      if ((el.userId === auth.user.id && el.typeId === 1) || el.userId !== auth.user.id){
        income += el.amount
      }
    });
     return income
  }
  const totalExpense = () => {
    let expense = 0
    histories?.forEach(el => {
      if (el.userId === auth.user.id && el.typeId !== 1){
        expense += el.amount
      }
    });
    return expense
  }
  const weeklyReport = () => {
    const today = new Date()
    const thisWeek = new Date(today.getTime() - ((today.getDay()-1)*24*60*60*1000))
    let earlyWeek = new Date(`${thisWeek.getFullYear()}-${thisWeek.getMonth()+1}-${thisWeek.getDate()}`)
    const endOfWeek = new Date(earlyWeek.getTime() +(6*24*60*60*1000))
    const report = []
    for(let i=1;i<8;i++){
      let balance = 0;
      histories?.forEach(el => {
        if (new Date(el.createdAt) >= earlyWeek && new Date(el.createdAt) <= endOfWeek && new Date(el.createdAt).getDay()===i){
          if(el.userId === auth.user.id && el.typeId !== 1){
            balance+=el.amount
          }else if((el.userId === auth.user.id && el.typeId === 1) || el.userId !== auth.user.id){
            balance-=el.amount
          }
        }
      })
      report.push(balance)
    }
    // const data = 
    return {report, day: ['Mon', 'Tue', 'Wed','Thus', 'Fri', 'Sat', 'Sun']}
  }
  return(
    <div>
      <SideBarLayout>
        <div className="bg-color7" style={{height: '100%', height: '100%'}}>
          <div className={`${styles.roundedten} col-12 bg-color4 text-white mt-3 mt-md-0 p-3`} style={{height: '25%'}}>
            <p className='p-0 m-0'>Balance</p>
            <h4>Rp {Number(auth.balance).toLocaleString('id-ID')}</h4>
            <p className='p-0 m-0'>{auth.phones.length>0 ? `+62${parseInt(auth.phones[0].number)}` : auth.user.email}</p>
          </div>
          <div className="d-flex flex-column flex-lg-row" style={{height: '75%'}}>
            <div className="col-12 col-lg-6 pt-4 pe-lg-2" style={{height: '100%'}}>
              <div className={`${styles.roundedten} bg-white shadow-lg pt-3`} style={{height: '100%'}}>
                <div className="col-12 col-md-8 col-lg-12 mx-auto">
                <BarChart data={weeklyReport().report} labels={weeklyReport().day} income={totalIncome()} expense={totalExpense()}/>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 pt-4 ps-lg-2" style={{height: '100%'}}>
              <div className={`${styles.roundedten} bg-white shadow p-3`} style={{height: '100%'}}>
                <div className="d-flex flex-row py-2">
                  <h3 className='fs-5'>Transaction History</h3>
                  <div className="ms-auto">
                    <Link href="/history">See All</Link>
                  </div>
                </div>
                <div className='overflow-auto' style={{height: '250px'}}>
                  <DataHistory dataHistory={histories} dataUser={users.userList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBarLayout>
    <Layout>
      <Title title="Dahboard" />
      <div className='container d-flex flex-column flex-md-row bg-color6 mb-5'>
        <div className='col-12 col-md-3'><Sidebar /></div>
        <div className='col-12 col-md-9 ms-md-3 me-0 overflow-auto' style={{height: '600px'}}>
          <div className={`${styles.roundedten} col-12 bg-color4 text-white my-3 mt-md-0 px-3 py-4`}>
            <p className='p-0 m-0'>Balance</p>
            <h3>Rp {Number(auth.balance).toLocaleString('id-ID')}</h3>
            <p className='p-0 m-0'>{auth.phones.length>0 ? `+62${parseInt(auth.phones[0].number)}` : auth.user.email}</p>
          </div>
          <div className='col-12 d-flex flex-column flex-md-row p-0 m-0'>
            <div className='col-12 col-md-6 pe-2'>
              <div className={`${styles.roundedten} bg-white shadow p-3`}>
                <BarChart data={weeklyReport().report} labels={weeklyReport().day} income={totalIncome()} expense={totalExpense()}/>
              </div>
            </div>
            <div className='col-12 col-md-6 ps-md-2 mt-3 mt-md-0'>
              <div className={`${styles.roundedten} bg-white shadow p-3`}>
                <div className="d-flex flex-row py-2">
                  <h3 className='fs-5'>Transaction History</h3>
                  <div className="ms-auto">
                    <Link href="/history">See All</Link>
                  </div>
                </div>
                <div className='overflow-auto' style={{maxHeight: '300px'}}>
                  <DataHistory dataHistory={histories} dataUser={users.userList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  )
}

export default Dashboard