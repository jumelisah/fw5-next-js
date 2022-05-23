import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Layout from "../components/Layout"
import Sidebar from "../components/SideBar"
import defaultUser from "../public/images/default-user.png"
import Image from "next/image"
import { useRouter } from "next/router"

const Transfer = () => {
  const [search, setSearch] = useState('')
  const {users} = useSelector(state => state)
  const router = useRouter()
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    if (!token) {
      router.push('/login')
    }
  })
  return(
    <Layout>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Sidebar />
          </div>
          <div className='col-12 col-md-9 bg-white' style={{borderRadius: '10px'}}>
            <div className="p-3">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="bg-light rounded-3 px-3 py-2" style={{width: "100%"}}/>
              <div className="py-3 overflow-auto" style={{height: 400}}>
                {users.userList.map((user, idx) => {
                  if(user.fullName.toLowerCase().includes(search) || user.fullName.toUpperCase().includes(search) || user.phone[0]?.number.includes(search)) return(
                    <div key={user.id} className="d-flex flex-row py-2" style={{cursor: "pointer"}} onClick={() => router.push(`/transfer/${[user.id]}`)}>
                      <Image src={user.picture || defaultUser} width={50} height={50} alt={user.id} className="rounded-3"/>
                      <div className="ms-3">
                        <p className="m-0 p-0">{user.fullName}</p>
                        <p className="m-0 p-0">{user.phone[0]?.number || user.email}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Transfer