import { Form } from "react-bootstrap"
import FormInput from "../components/FormInput"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { FiLock } from "react-icons/fi"
import Button from "../components/Button"
import { useState } from "react"

const ChangePin = () => {
  const [errPassword, setErrPassword] = useState(false)
  const changePassword = (e) => {
    e.preventDefault()
    const currentPassword = e.target.elements['currentPassword'].value
    const newPassword = e.target.elements['newPassword'].value
    const repeatNewPassword = e.target.elements['repeatNewPassword'].value
    if(newPassword!==repeatNewPassword){
      setErrPassword(true)
    }
    alert(`${currentPassword}, ${newPassword}, ${repeatNewPassword}`)
  }
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <h1 className='fs-6'>Change Password</h1>
            <p style={{maxWidth: '350px'}}>You must enter your current password and then type your new password twice.</p>
            <Form onSubmit={changePassword}>
              <FormInput name='currentPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='Current Password'/>
              <FormInput name='newPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='New Password'/>
              <FormInput name='repeatNewPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='Repeat New Password'/>
              <Button>Change Password</Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ChangePin