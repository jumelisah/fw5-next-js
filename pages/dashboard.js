import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import styles from "../styles/Dashboard.module.css"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { connect, useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getBalance, getPhoneNumber } from "../redux/actions/auth"
import { useRouter } from "next/router"
import { getHistory } from "../redux/actions/transactions"
import { getAllUser } from "../redux/actions/users"
import transactions from "../redux/reducers/transactions"
import { History } from "../components/History"

const Dashboard = ({getHistory, getAllUser, getBalance, getPhoneNumber, auth, transactions, users}) => {
  const dispatch = useDispatch()
  const route = useRouter()
  useEffect (()=> {
    const token = window.localStorage.getItem('token')
    if(token){
      getBalance(token)
      getHistory(token)
      getPhoneNumber(token)
      getAllUser(token)
    }
  }, [getBalance, getAllUser, getHistory, getPhoneNumber])
  return(
    <Layout>
      <div className='container d-flex flex-column flex-md-row bg-color6 mb-5'>
        <div className='col-12 col-md-3'><Sidebar /></div>
        <div className='row col-12 col-md-8 mx-auto me-md-0'>
          <div className={`${styles.roundedten} col-12 bg-color4 text-white mt-3 mt-md-0`} style={{width: '100%'}}>
            <p>Balance</p>
            <h3>Rp {Number(auth.balance).toLocaleString('id-ID')}</h3>
            <p>{auth.phones.length>0 ? auth.phones[0].number : auth.user.email}</p>
          </div>
          <div className={`${styles.roundedten} col-12 col-lg-6 bg-white mt-4`}>
            <div className='d-flex'>
              <div>
                <AiOutlineArrowDown className='fs-3 text-color4'/>
                <p>Income</p>
                <h4>Rp 2.120.000</h4>
              </div>
              <div className='ms-auto'>
                <AiOutlineArrowUp className='fs-3 text-danger'/>
                <p>Expense</p>
                <h4>Rp 2.120.000</h4>
              </div>
            </div>
          </div>
          <div className={`${styles.roundedten} bg-white col-12 col-lg-5 ms-lg-auto mt-4`}>
            <h3 className='fs-5'>Transaction History</h3>
            <div><History dataHistory={transactions.history} dataUser={users.userList} /></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({auth: state.auth, transactions: state.transactions, users: state.users})
const mapDispatchToProps = {getHistory, getAllUser, getBalance, getPhoneNumber}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)