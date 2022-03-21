import Image from "next/image"
import { useEffect } from "react"
import { Form } from "react-bootstrap"
import { connect, useSelector } from "react-redux"
import FormInput from "../components/FormInput"
import { DataHistory } from "../components/History"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import transactions from "../redux/reducers/transactions"
import styles from "../styles/Dashboard.module.css"

const History = ({transactions, users, auth}) =>{
  useEffect(()=>{
    console.log(transactions)
  }, [transactions])
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white mt-4 mt-md-0 p-3' style={{borderRadius: '10px'}}>
            <h1 className='fs-3'>Transaction History</h1>
            <Form>
              <FormInput name='search' type='text' />
            </Form>
            {!auth.isLoading &&
            <DataHistory dataHistory={transactions.history} dataUser={users.userList} />}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({transactions: state.transactions, users: state.users, auth: state.auth})
export default connect(mapStateToProps)(History)