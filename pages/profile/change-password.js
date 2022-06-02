import { Form } from "react-bootstrap"
import FormInput from "../../components/FormInput"
import { FiLock } from "react-icons/fi"
import Button from "../../components/Button"
import { useState } from "react"
import { changePassword } from "../../redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../../components/Modal"
import Image from "next/image"
import SuccessModal from "../../components/SuccessModal"
import ErrorModal from "../../components/ErrorModal"
import Title from "../../components/Title"
import SideBarLayout from "../../components/SidebarLayout"

const ChangePassword = () => {
  const {auth} = useSelector(state => state)
  const [showModal, setShowModal] = useState(false)
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const dispatch = useDispatch()

  const onChangePassword = (e) => {
    e.preventDefault()
    if(oldPassword && newPassword && confirmPassword && newPassword === confirmPassword){
      setShowModal(true)
      const token = window.sessionStorage.getItem('beWalletToken')
      const data = {oldPassword, newPassword, confirmPassword}
      dispatch(changePassword(data, token))
    }
  }
  const closeModal = () => {
    if (!auth.isLoading){
      setShowModal(false)
      setOldPassword()
      setNewPassword()
      setConfirmPassword()
    }
  }
  return(
    <>
    <Title title="Change Password" />
    <SideBarLayout>
      <div className="p-4">
        <h1 className='fs-6'>Change Password</h1>
        <p style={{maxWidth: '350px'}} className="pb-2">You must enter your current password and then type your new password twice.</p>
        <Form onSubmit={onChangePassword}>
          <FormInput type='password' variant={`border-0 border-bottom ps-4 my-2 ${oldPassword? 'text-color5 border-color5' : ''}`} icon={<FiLock className={`${oldPassword ? 'text-color5' : ''}`} />} placeholder='Current Password' value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
          <FormInput type='password' variant={`border-0 border-bottom ps-4 my-2 ${(newPassword && !confirmPassword) || (confirmPassword && newPassword === confirmPassword)? 'text-color5 border-color5' : confirmPassword && confirmPassword !== newPassword ? 'text-danger' : ''}`} icon={<FiLock className={`${(newPassword && !confirmPassword) || (confirmPassword && newPassword === confirmPassword) ? 'text-color5' : newPassword !== confirmPassword ? 'text-danger' : ''}`} />} placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          <FormInput type='password' variant={`border-0 border-bottom ps-4 my-2 ${confirmPassword && confirmPassword===newPassword? 'text-color5 border-color5' : confirmPassword!==newPassword ? 'text-danger' : ''}`} icon={<FiLock className={`${oldPassword && newPassword === confirmPassword ? 'text-color5' : newPassword !== confirmPassword ? 'text-danger' : ''}`} />} placeholder='Repeat New Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
          {newPassword && confirmPassword && (newPassword !== confirmPassword) && <p className="text-danger">Password not match</p>}
          <Button variant={`${oldPassword && newPassword && confirmPassword && newPassword===confirmPassword ? 'bg-color5' : ''}`}>Change Password</Button>
        </Form>
      </div>
    </SideBarLayout>
    {showModal && <Modal handleClose={closeModal}>
      {auth.isLoading && <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
      {!auth.isLoading && !auth.isError && <SuccessModal message={auth.message} />}
      {!auth.isLoading && auth.isError && <ErrorModal message={auth.errMessage}/>}
    </Modal>}
    </>
  )
}

export default ChangePassword