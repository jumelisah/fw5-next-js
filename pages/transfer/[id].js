import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import Otp from "../../components/Otp"
import defaultImage from "../../public/images/default-user.png"
import { getBalance } from "../../redux/actions/auth"
import { transferBalance } from "../../redux/actions/transactions"
import Head from "next/head"
import ErrorModal from "../../components/ErrorModal"
import FormInput from "../../components/FormInput"
import { BiPencil } from "react-icons/bi"
import { dateToString } from "../../helpers/dates"
import Modal from "../../components/Modal"
import SuccessModal from "../../components/SuccessModal"
import SideBarLayout from "../../components/SidebarLayout"

const TransferTo = () => {
  const {auth, users, transactions} = useSelector(state => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState()
  const [pin, setPin] = useState()
  const [notes, setNotes] = useState()
  const [askPin, setAskPin] = useState(false)
  const [stepTwo, setStepTwo] = useState(false)
  const [stepThree, setStepThree] = useState(false)
  const [user, setUser] = useState()
  const [userToken, setUserToken] = useState()
  useEffect(() => {
    const token = window.sessionStorage.getItem('beWalletToken')
    const userList = JSON.parse(window.sessionStorage.getItem('beWalletUsers'))
    const userData = JSON.parse(window.sessionStorage.getItem('beWalletUser'))
    setUser(userList.find(el => el.id === parseInt(router.query.id)))
    setUserToken(token)
    if(userData.id === parseInt(router.query.id)){
      router.push('/transfer')
    }
    if(!token){
      router.push('/login')
    }else{
      dispatch(getBalance(token))
    }
  }, [dispatch, router])
  const doTransfer = () => {
    setStepThree(true)
    setAskPin(false)
    dispatch({
      type: 'TRANSACTION_CLEAR'
    })
    const data = {amount, recipient: router.query.id, pin, notes}
    dispatch(transferBalance(data, userToken))
  }
  return(
    <>
    <Head>
      <title>Transfer - {user?.fullName} | Be Wallet</title>
    </Head>
    <SideBarLayout>
      <div className="p-4">
        {!stepTwo && !stepThree && <div>
          <h1 className="fs-4">Transfer Money</h1>
          <div className="p-2 my-3 d-flex flex-row shadow rounded-3">
            <Image src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName} className="rounded-3"/>
            <div className="ms-3">
              <p className="m-0 p-0 fw-bold">{user?.fullName}</p>
              <p className="m-0 p-0 py-1" style={{fontSize: 12}}>{user?.phone[0]?.number || user?.email}</p>
            </div>
          </div>
          <div className="py-2">
            <p className="m-0 p-0">Type the amount you want to transfer and then</p>
            <p className="m-0 p-0">press continue to the next step</p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <FormInput type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} variant="py-3 fs-2 text-center border-0" />
            <p className="text-center">Rp {(amount ? auth.balance-amount : auth.balance).toLocaleString('id-ID')} Available</p>
            <div className="col-4">
            <FormInput icon={<BiPencil />} placeholder="Add some notes" value={notes} onChange={e => setNotes(e.target.value)} variant="px-4 border-0 border-bottom text-center" />
            </div>
          </div>
          {amount < 10000 && <p className="text-danger position-absolute start-0 top-50 bg-color6 shadow p-3 m-3 rounded">Minimum balance to transfer is Rp 10.000</p>}
          <div className="col-md-6 col-lg-3 ms-auto mt-3">
            <Button variant={amount >= 10000 ? 'bg-color5 text-white' : 'border-0'} onClick={()=> {if(amount && amount>=10000) setStepTwo(true)}}>Continue</Button>
          </div>
        </div>}
        {(stepTwo || stepThree) && <div>
          {stepThree && transactions.message && <SuccessModal message={transactions.message} />}
          {stepThree && transactions.isError && <ErrorModal message={transactions.errMessage} />}
          {stepTwo && !stepThree && <div>
            <h6>Transfer To</h6>
            <div className="p-2 my-4 d-flex flex-row shadow rounded-3">
              <Image src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName} className="rounded-3"/>
              <div className="ms-3">
                <p className="m-0 p-0 fw-bold">{user?.fullName}</p>
                <p className="m-0 p-0 py-1" style={{fontSize: 12}}>{user?.phone[0]?.number || user?.email}</p>
              </div>
            </div>
          </div>}
          <h6>Details</h6>
          <div className="shadow-sm px-3 py-2 rounded-3 mb-2">
            <p className="m-0 p-0">Amount</p>
            <h5 className="m-0 py-1">Rp {amount.toLocaleString('id-ID')}</h5>
          </div>
          <div className="shadow-sm px-3 py-2 rounded-3 mb-2">
            <p className="m-0 p-0">Balance Left</p>
            <h5 className="m-0 py-1">Rp {(auth.balance-amount).toLocaleString('id-ID')}</h5>
          </div>
          <div className="shadow-sm px-3 py-2 rounded-3 mb-2">
            <p className="m-0 p-0">Date & Time</p>
            <h5 className="m-0 py-1">{dateToString(new Date())}</h5>
          </div>
          <div className="shadow-sm px-3 py-2 rounded-3 mb-2">
          <p className="m-0 p-0">Notes</p>
          <h5 className={`m-0 py-1 ${!notes ? 'py-3' : ''}`}>{notes}</h5>
          </div>
          {stepThree && <div>
            <h6>Transfer To</h6>
            <div className="p-2 my-4 d-flex flex-row shadow-sm rounded-3">
              <Image src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName} className="rounded-3"/>
              <div className="ms-3">
                <p className="m-0 p-0 fw-bold">{user?.fullName}</p>
                <p className="m-0 p-0 py-1" style={{fontSize: 12}}>{user?.phone[0]?.number || user?.email}</p>
              </div>
            </div>
          </div>}
          <div className="col-md-6 col-lg-3 ms-auto mt-3">
            <Button variant={`${stepThree && !transactions.isError ? 'd-none' : 'd-block'} bg-color5 text-white`} onClick={()=> {setAskPin(true); setPin()}}>{stepThree && transactions.isError ? 'Try Again' : 'Continue'}</Button>
          </div>
        </div>}
      </div>
    </SideBarLayout>
      {(askPin || transactions.isLoading) && <Modal handleClose={() => setAskPin(false)} loadingParam={transactions}>
        <div>
          {!transactions.isLoading && <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="fs-5">Input your pin</p>
            <Otp value={pin} onChange={otp => setPin(otp)} />
            <div className="col-md-6 ms-auto mt-5">
              <Button variant="bg-color5 text-white" onClick={doTransfer}>Continue</Button>
            </div>
          </div>}
          {transactions.isLoading && <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
        </div>
      </Modal>}
    </>
  )
}

export default TransferTo
