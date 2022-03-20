import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Button from "../components/Button"
import FormInput from "../components/FormInput"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { topUp } from "../redux/actions/transactions"

const Topup = () => {
  const { auth } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [errTopup, setErrTopUp] = useState(false)

  // useEffect(()=>{
  //   const token = window.localStorage.getItem('token')
  //   if(token){
      
  //   }
  // })
  const topup = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('token')
    const amount = e.target.elements['amount'].value
    if(amount < 10000){
      setErrTopUp(true)
    }else{
      dispatch(topUp(amount, token))
    }
  }
  const closeErr = () => {
    setErrTopUp(false)
  }
  return(
    <div className='position-relative'>
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <div>
              <h1 className='fs-5'>Top Up</h1>
              <p>Enter the amount of money, and click submit</p>
              <Form onSubmit={topup}>
                <FormInput type='number' name='amount' variant='border' />
                <Button variant='bg-color4'>Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    {errTopup && <div className='bg-secondary bg-opacity-10 position-absolute top-0 d-flex justify-content-center align-items-center vh-100 vw-100' onClick={closeErr}>
      <div className='bg-white p-3' style={{borderRadius:'10px'}}>
        <h1 className='border border-4 border-color5 text-danger rounded-pill text-center mx-auto' style={{width: '60px', height: '60px', lineHeight: '50px'}}>X</h1>
        <h1 className='fs-4 text-danger text-center'>FAILED</h1>
        <p>Minimum top up amount is Rp. 10.000</p>
        </div>
    </div>}
    </div>
  )
}

export default Topup