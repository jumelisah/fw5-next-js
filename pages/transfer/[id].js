import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import Layout from "../../components/Layout"
import Sidebar from "../../components/SideBar"
import defaultImage from "../../public/images/default-user.png"
import { getBalance } from "../../redux/actions/auth"

const TransferTo = () => {
  const {auth, users} = useSelector(state => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const user = users.userList.find(el => el.id === parseInt(router.query.id))
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    if(!token){
      router.push('/login')
    }else{
      dispatch(getBalance(token))
    }
  }, [dispatch, router])
  return(
    <Layout>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white' style={{borderRadius: '10px'}}>
            <div className="p-3">
              <h1 className="fs-4">Transfer Money</h1>
              <div className="p-4 my-4 d-flex flex-row shadow rounded-3">
                <Image src={user?.image ? user?.image : defaultImage} width={50} height={50} alt={user?.fullName} className="rounded-3"/>
                <div className="ms-3">
                  <p className="m-0 p-0">{user?.fullName}</p>
                  <p className="m-0 p-0">{user?.phone[0]?.number || user?.email}</p>
                </div>
              </div>
              <div className="py-3">
                <p className="m-0 p-0">Type the amount you want to transfer and then</p>
                <p className="m-0 p-0">press continue to the next step</p>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <input type="number" placeholder="0.00" className="my-5 text-center fs-1 border-0 outline-none"/>
                <p className="text-center">Rp {auth.balance.toLocaleString('id-ID')} Available</p>
              </div>
              <Button>Transfer</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TransferTo
