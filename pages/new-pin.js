import { Form } from "react-bootstrap"
import FormInput from "../components/FormInput"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { FiLock } from "react-icons/fi"
import Button from "../components/Button"
import { useState } from "react"
import { useRouter } from 'next/router';
import OtpInput from 'react-otp-input';
import Title from "../components/Title"

const NewPin = () => {
  const [state, setState] = useState({otp: null})
  const handleChange = (otp) => setState({ otp })
  const router = useRouter()
  const [errPin, setErrPin] = useState(false)
  const changePin = (e) => {
    e.preventDefault()
    e.preventDefault()
    const pin = state.otp
    if(!pin){
      setErrPin(true)
    }
    // console.log(register(data))
    // router.push('/create-pin')
  }
  return(
    <Layout>
      <Title title="New PIN" />
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <h1 className='fs-6'>Change Pin</h1>
            <p style={{maxWidth: '350px'}}>Type your new 6 digits security PIN to use in Zwallet..</p>
            <Form onSubmit={changePin}>
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

export default NewPin