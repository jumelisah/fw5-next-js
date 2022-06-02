import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import Button from "../components/Button"
import FormInput from "../components/FormInput"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { topUp } from "../redux/actions/transactions"
import { BsCheckCircle } from 'react-icons/bs'
import Title from "../components/Title"
import Modal from "../components/Modal"
import transactions from "../redux/reducers/transactions"
import ErrorModal from "../components/ErrorModal"
import SuccessModal from "../components/SuccessModal"
import SideBarLayout from "../components/SidebarLayout"

const Topup = () => {
  const { auth, transactions } = useSelector(state => state)
  const dispatch = useDispatch()
  const [errTopup, setErrTopUp] = useState(false)
  const [successTopup, setSuccessTopUp] = useState(false)
  const [amount, setAmount] = useState()
  const [showModal, setShowModal] = useState(false)
  
  const topup = () => {
    const token = window.sessionStorage.getItem('beWalletToken')
    dispatch(topUp(amount, token))
    setShowModal(true)
  }
  return(
    <div>
      <Title title="Topup" />
      <SideBarLayout>
        <div className="p-3 d-flex flex-column justify-content-center align-items-center" style={{height: '100%'}}>
          <h1 className='fs-5'>Top Up</h1>
          <p>Enter the amount of money, and click submit</p>
          <FormInput type='number' name='amount' variant='border p-2 text-center' value={amount} onChange={e => setAmount(e.target.value)} />
          {amount < 10000 && <p className="text-danger position-absolute start-0 top-50 bg-color6 shadow p-3 m-3 rounded">Minimum balance to topup is Rp 10.000</p>}
          <div className="col-12 col-md-6 col-lg-4">
            <Button variant={`${amount >= 10000 ? 'bg-color5' : 'border-0'}`} onClick={() => {if (amount >=10000) topup()}}>Topup</Button>
          </div>
        </div>
      </SideBarLayout>
      {showModal && <Modal handleClose={() => {setShowModal(false); dispatch({type: 'TRANSACTION_CLEAR'})}}>
        <div>
        {transactions.isLoading && <Image className="mx-auto" src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
        {transactions.isError && !transactions.isLoading && <ErrorModal message={transactions.errMessage} />}
        {!transactions.isError && !transactions.isLoading && <SuccessModal message={transactions.message} />}
        </div>
      </Modal>}
    </div>
  )
}

export default Topup