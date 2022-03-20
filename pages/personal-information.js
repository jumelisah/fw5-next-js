import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import { getPhoneNumber, getUserData } from "../redux/actions/auth"

const PersonalInformation = ({auth}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const dispatch = useDispatch()
  useEffect (()=>{
    const token = window.localStorage.getItem('token')
    if(token){
      getPhoneNumber(token)
      if(!auth.isError && !auth.isLoading){
        const fullName = auth.user.fullName
        const arrName = fullName.split(' ')
        setFirstName(arrName[0])
        if(arrName[1]){
          setLastName(arrName[1])
        }
      }
    }
  }, [auth])
  return(
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-3'><Sidebar /></div>
          <div className='col-12 col-md-9 bg-white'>
            <h1 className='fs-3'>Personal Information</h1>
            <p style={{maxWidth: '350px'}}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
            {!auth.isLoading && !auth.isError && <div>
              <p className='fw-bold'>First Name</p>
              <p>{firstName}</p>
              <p className='fw-bold'>Last Name</p>
              <p>{lastName}</p>
              <p className='fw-bold'>Verified email</p>
              <p>{auth.user.email}</p>
              {auth.phones.map((data)=>{
                return(
                  <p key={data.number}>{data.number}</p>
                )
              })}
            </div>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation)