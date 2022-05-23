import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import FormInput from "../../components/FormInput"
import Layout from "../../components/Layout"
import Sidebar from "../../components/SideBar"
import { getPhoneNumber, getUserData } from "../../redux/actions/auth"
import Head from "next/head"

const PersonalInformation = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.user.fullName)
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(auth.user.email)
  const dispatch = useDispatch()
  useEffect (()=>{
    const token = window.localStorage.getItem('beWalletToken')
    const userData = JSON.parse(window.localStorage.getItem('beWalletUser'))
    if(token){
      dispatch(getPhoneNumber(token))
      setEmail(userData.email)
      const fullName = userData.fullName.split(' ')
      setFirstName(fullName[0])
      if(fullName[1]){
        setLastName(fullName[1])
      }
    }
  }, [dispatch])
  return(
    <Layout>
      <div className='container'>
        <Head>
          <title>Personal Information | Be Wallet</title>
        </Head>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white px-5 py-4 my-3 mt-md-0 overflow-auto shadow' style={{height: '500px'}}>
            <h1 className='fs-3'>Personal Information</h1>
            <p style={{maxWidth: '350px'}}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
            <div>
              <p className='fw-bold'>First Name</p>
              <FormInput value={firstName} onChange={e => setFirstName(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
              <p className='fw-bold'>Last Name</p>
              <FormInput value={lastName} onChange={e => setLastName(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
              <p className='fw-bold'>Verified email</p>
              <FormInput  value={email} onChange={e => setFirstEmail(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
              <p className='fw-bold'>Phone number</p>
              {auth.phones.map((data)=>{
                return(
                  <p key={data.number}>{data.number}</p>
                )
              })}
            </div>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation)