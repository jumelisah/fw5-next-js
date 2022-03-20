import { Form } from "react-bootstrap"
import FormInput from "../components/FormInput"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { FiLock } from "react-icons/fi"
import Button from "../components/Button"
import { useState } from "react"
import { changePassword } from "../redux/actions/auth"
import { connect } from "react-redux"

const ChangePassword = ({auth, changePassword}) => {
  const [errPassword, setErrPassword] = useState(false)
  const [formFilled, setFormFilled] = useState(false)

  const onChangePassword = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('token')
    const oldPassword = e.target.elements['oldPassword'].value
    const newPassword = e.target.elements['newPassword'].value
    const confirmPassword = e.target.elements['confirmPassword'].value
    const data = {oldPassword, newPassword, confirmPassword}
    if(newPassword!==confirmPassword){
      setErrPassword(true)
    }else if(newPassword.length < 6 || confirmPassword.length< 6){
      alert('Password should contain minimum 6 characters')
      setErrPassword(false)
    }
    else{
      setErrPassword(false)
      changePassword(data, token)
      
    }
  }
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <h1 className='fs-6'>Change Password</h1>
            <p style={{maxWidth: '350px'}}>You must enter your current password and then type your new password twice.</p>
            <Form onSubmit={onChangePassword}>
              <FormInput name='oldPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='Current Password'/>
              <FormInput name='newPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='New Password'/>
              <FormInput name='confirmPassword' type='password' variant='border-0 border-bottom' icon={<FiLock />} placeholder='Repeat New Password'/>
              <p className={`text-danger ${errPassword ? 'd-block' : 'd-none'}`}>Password not match</p>
              <Button>Change Password</Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
const mapDispatchToProps = {changePassword}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)