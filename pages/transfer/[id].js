import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import Otp from "../../components/Otp"
import Sidebar from "../../components/SideBar"
import defaultImage from "../../public/images/default-user.png"
import { getBalance } from "../../redux/actions/auth"
import { transferBalance } from "../../redux/actions/transactions"
import { BsFillPatchCheckFill, BsXOctagonFill } from "react-icons/bs"
import Head from "next/head"

const TransferTo = () => {
  const {auth, users, transactions} = useSelector(state => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState()
  const [pin, setPin] = useState()
  const [notes, setNotes] = useState()
  const [askPin, setAskPin] = useState(true)
  const [showModalTr, setShowModalTr] = useState(false)
  const [errorBalance, setErrorBalance] = useState(false)
  const [user, setUser] = useState()
  const [userToken, setUserToken] = useState()
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    const userList = JSON.parse(window.localStorage.getItem('beWalletUsers'))
    setUser(userList.find(el => el.id === parseInt(router.query.id)))
    setUserToken(token)
    if(!token){
      router.push('/login')
    }else{
      dispatch(getBalance(token))
    }
  }, [dispatch, router])
  const transferModal = () => {
    setPin()
    setAskPin(true)
    dispatch({
      type: 'TRANSACTION_CLEAR'
    })
    if(amount >= 10000) setShowModalTr(true)
  }
  const doTransfer = () => {
    setAskPin(false)
    const data = {amount, recipient: router.query.id, pin, notes}
    dispatch(transferBalance(data, userToken))
  }
  return(
    <>
    <Head>
      <title>Transfer - {user?.fullName} | Be Wallet</title>
    </Head>
    <Layout>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white' style={{borderRadius: '10px'}}>
            <div className="p-3">
              <h1 className="fs-4">Transfer Money</h1>
              <div className="p-4 my-4 d-flex flex-row shadow rounded-3">
                <Image src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName} className="rounded-3"/>
                <div className="ms-3">
                  <p className="m-0 p-0">{user?.fullName}</p>
                  <p className="m-0 p-0">{user?.phone[0]?.number || user?.email}</p>
                </div>
              </div>
              <div className="py-3">
                <p className="m-0 p-0">Type the amount you want to transfer and then</p>
                <p className="m-0 p-0">press continue to the next step</p>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <input type="number" placeholder="0.00" className="my-5 text-center fs-1 border-0 outline-none" value={amount} onChange={e => setAmount(e.target.value)}/>
                <p className="text-center">Rp {auth.balance.toLocaleString('id-ID')} Available</p>
              </div>
              {amount < 10000 && <p className="text-danger">Minimum balance to transfer is Rp 10.000</p>}
              <Button variant={amount >= 10000 ? 'bg-color5' : 'border-0'} onClick={transferModal}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
      {showModalTr && <div className="position-absolute top-0 start-0 position-fixed d-flex justify-content-center align-items-center vh-100 vw-100" style={{zIndex: 999}}>
        <div className="bg-dark opacity-25 vh-100 vw-100" onClick={() => setShowModalTr(false)}></div>
        <div className="position-absolute top-50 start-50 translate-middle bg-color6 d-flex justify-content-center align-items-center rounded shadow p-3" style={{width: 250, height:400}}>
          {(!pin || pin.length < 6) && askPin && <div>
            <p className="fs-5">Input your pin</p>
            <Otp value={pin} onChange={otp => setPin(otp)} />
          </div>}
          {askPin && pin && pin.length >= 6 && <div className="pb-3">
            <p className="fs-5 fw-bold text-center">Notes</p>
            <textarea className="bg-color6 border-color5 rounded" type="text" value={notes} onChange={e => setNotes(e.target.value)} rows={4} style={{width: '100%'}}/>
            <p className="mb-3 text-success" style={{fontSize: 10}}>You can leave this field empty</p>
            <Button variant="bg-color5" onClick={doTransfer}>Transfer</Button>
          </div>}
          {transactions.isLoading && <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
          {transactions.message && !askPin && <div>
            <div className="mb-3 fs-5 fw-bold d-flex flex-row justify-content-center align-items-center">
              <BsFillPatchCheckFill className="text-color5"/>
              <p className="p-0 m-0 ps-2">Transfer Detail</p>
            </div>
            <div className="overflow-auto" style={{height: 200}}>
            <p className="fw-bold">Recipient</p>
            <div className="d-flex flex-row mb-2">
              <Image className="img-fluid img-thumbnail" src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName}/>
              <div className="ms-3">
                <p className="m-0 p-0">{user?.fullName}</p>
                <p className="m-0 p-0">{user?.phone[0]?.number || user?.email}</p>
              </div>
            </div>
            <p className="fw-bold">Amount: Rp {amount.toLocaleString('id-ID')}</p>
            <p className="fw-bold p-0 m-0">Notes</p>
            <p className="p-0 m-0">{notes}</p>
            </div>
            <Button variant="bg-color5">Close</Button>
          </div>}
          {transactions.isError && !askPin && <div className="text-center">
            <BsXOctagonFill size={30} className="text-danger" />
            <p className="fs-4 fw-bold text-danger">{transactions.errMessage}</p>
            <Button variant="bg-color5" onClick={() => setAskPin(true)}>Try Again</Button>
          </div>}
        </div>
      </div>}
    </Layout>
    </>
  )
}

export default TransferTo
