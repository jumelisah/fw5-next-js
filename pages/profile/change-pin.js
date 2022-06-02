import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { changePinNumber } from "../../redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import Otp from "../../components/Otp"
import SideBarLayout from "../../components/SidebarLayout"
import Title from "../../components/Title"
import Modal from "../../components/Modal";
import ErrorModal from "../../components/ErrorModal";
import Image from "next/image";
import SuccessModal from "../../components/SuccessModal";

const ChangePin = () => {
  const {auth} = useSelector(state => state)
  const [oldPin, setOldPin] = useState(null)
  const [newPin, setNewPin] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changePin = () => {
    setShowModal(true)
    const token = window.localStorage.getItem('beWalletToken')
    if (oldPin && newPin?.length === 6) {
    dispatch(changePinNumber({oldPin, newPin}, token))
    }
  }
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    if(!token) {
      router.push('/login')
    }
    if (oldPin && newPin?.length === 6) {
      changePin()
    }
  }, [router, dispatch, newPin, oldPin, changePin])
  
  const closeModal = () => {
    if (!auth.isLoading){
      setShowModal(false)
      setOldPin()
      setNewPin()
    }
  }
  return(
    <>
    <Title title="Change PIN" />
    <SideBarLayout>
      <div className='p-4'>
        <h1 className='fs-6'>Change Pin</h1>
        <p style={{maxWidth: '350px'}}>{!oldPin || oldPin.length < 6 ? 'Enter your current 6 digits Zwallet PIN below to continue to the next steps.' : 'Type your new 6 digits security PIN to use in Zwallet..'}</p>
        <div className='d-flex flex-column justify-content-center align-items-center mt-5 pt-5'>
          {(!oldPin || oldPin.length < 6) && <Otp value={oldPin} onChange={otp => setOldPin(otp)} />}
          {oldPin && oldPin.length === 6 && <Otp value={newPin} onChange={otp => setNewPin(otp)} />}
          <Button variant={`mt-5 ${oldPin && newPin ? 'bg-color5 text-white' : ''}`} onClick={changePin}>Change PIN</Button>
        </div>
      </div>
    </SideBarLayout>
    {showModal && <Modal handleClose={closeModal}>
      {!auth.isLoading && auth.isError && <ErrorModal message={auth.errMessage} />}
      {auth.isLoading && <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
      {!auth.isLoading && !auth.isError && <SuccessModal message={auth.message} />}
    </Modal>}
    </>
  )
}

export default ChangePin