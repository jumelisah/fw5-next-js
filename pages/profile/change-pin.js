import { Form } from "react-bootstrap"
import FormInput from "../../components/FormInput"
import Layout from "../../components/Layout"
import Sidebar from "../../components/SideBar"
import { FiLock } from "react-icons/fi"
import Button from "../../components/Button"
import { useState } from "react"
import { useRouter } from 'next/router';
import OtpInput from 'react-otp-input';
import { changePinNumber } from "../../redux/actions/auth"
import { connect } from "react-redux"

const ChangePin = ({changePinNumber, auth}) => {
  const [state, setState] = useState({otp: null})
  const [oldPin, setOldPin] = useState(null)
  const [newPin, setNewPin] = useState(null)
  const [newPinPage, setNewPinPage] = useState(false)
  const handleChange = (otp) => setState({ otp })
  const router = useRouter()
  const [errPin, setErrPin] = useState(false)
  const changePin = (e) => {
    e.preventDefault()
    const pin = state.otp
    if(!pin){
      setErrPin(true)
    }else{
      setOldPin(pin)
      setNewPinPage(true)
      setState({otp: null})
    }
    // console.log(register(data))
    // router.push('/create-pin')
  }
  const getNewPin = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('token')
    const pin = state.otp
    if(!pin){
      setErrPin(true)
    }else{
      setNewPin(pin)
      const data = {oldPin, newPin}
      changePinNumber(data, token)
      if(auth.isError){
        alert(auth.errMessage)
      }
    }
  }
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <h1 className='fs-6'>Change Pin</h1>
            <p style={{maxWidth: '350px'}}>{!newPinPage ? 'Enter your current 6 digits Zwallet PIN below to continue to the next steps.' : 'Type your new 6 digits security PIN to use in Zwallet..'}</p>
            <Form onSubmit={!newPinPage? changePin : getNewPin}>
            <OtpInput className='text-center'
            value={state.otp}
            onChange={handleChange}
            numInputs={6}
            separator={<span>-</span>}
          />
            {errPin && <p className='text-danger'>Please input the field</p>}
              <Button variant={`${state.otp && state.otp.length===6 ? 'bg-color3 text-white' : ''}`}>Change Pin</Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
const mapDispatchToProps = {changePinNumber}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePin)