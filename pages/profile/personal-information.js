import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import FormInput from "../../components/FormInput"
import Layout from "../../components/Layout"
import Sidebar from "../../components/SideBar"
import { getPhoneNumber, getUserData, updateProfile } from "../../redux/actions/auth"
import Head from "next/head"
import Title from "../../components/Title"
import SideBarLayout from "../../components/SidebarLayout"
import Link from "next/link"
import { RiPencilLine } from "react-icons/ri"
import { useRouter } from "next/router"
import Image from "next/image"
import Modal from "../../components/Modal"
import SuccessModal from "../../components/SuccessModal"
import ErrorModal from "../../components/ErrorModal"


const PersonalInformation = ({auth}) => {
  const [firstName, setFirstName] = useState(auth.user.fullName)
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(auth.user.email)
  const [userToken, setUserToken] = useState()
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect (()=>{
    const token = window.localStorage.getItem('beWalletToken')
    const userData = JSON.parse(window.localStorage.getItem('beWalletUser'))
    if(token){
      setUserToken(token)
      dispatch(getPhoneNumber(token))
      setEmail(userData.email)
      const fullName = userData.fullName.split(' ')
      setFirstName(fullName[0])
      if(fullName[1]){
        for(let i=1;i<fullName.length;i++){
          setLastName(`${lastName? `${lastName} ` : '' }${fullName[i]}`)
        }
      }
    }else{
      router.push('/')
    }
  }, [dispatch, lastName, router])
  const changeProfile = () => {
    setShowModal(true)
    const data = {fullName: firstName + `${lastName ? ` ${lastName}` : ''}`, email}
    dispatch(updateProfile(data, userToken))
  }
  return(
    <>
    <Title title="Personal Information" />
    <SideBarLayout>
      <div className="p-4">
        <h1 className='fs-3'>Personal Information</h1>
        <p style={{maxWidth: '350px'}}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
        <div className="overflow-auto mb-4" style={{height: 250}}>
          <p className='fw-bold'>First Name</p>
          <FormInput value={firstName} onChange={e => setFirstName(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
          <p className='fw-bold'>Last Name</p>
          <FormInput value={lastName} onChange={e => setLastName(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
          <p className='fw-bold'>Verified email</p>
          <FormInput  value={email} onChange={e => setFirstEmail(e.target.value)} variant={'px-0 border-0 border-bottom'}/>
          <p className='fw-bold'>Phone number</p>
          <div className="d-flex">
            {auth.phones.map((data)=>{
              return(
                <p key={data.number}>{data.number}</p>
              )
            })}
            <div className="ms-auto d-flex pe-3" onClick={() => router.push('/')} style={{cursor: "pointer"}}>
              <RiPencilLine size={24} />
              <p className="ms-2">Edit</p>
            </div>
          </div>
        </div>
        <Button variant={"bg-color5 text-white"} onClick={changeProfile}>Save changes</Button>
      </div>
    </SideBarLayout>
    {showModal && <Modal handleClose={() => {if (!auth.isLoading) setShowModal(false)}}>
      {auth.isLoading && <Image src='/images/loading-buffering.gif' alt='loading' width={100} height={100} />}
      {!auth.isLoading && !auth.isError && <SuccessModal message={auth.message} />}
      {!auth.isLoading && auth.isError && <ErrorModal message={auth.errMessage}/>}
    </Modal>}
    </>
  )
}

const mapStateToProps = (state) => ({auth: state.auth})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation)