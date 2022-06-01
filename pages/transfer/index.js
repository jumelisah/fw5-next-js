import { useEffect, useState } from "react"
import Sidebar from "../../components/SideBar"
import defaultUser from "../../public/images/default-user.png"
import Image from "next/image"
import { useRouter } from "next/router"
import Title from "../../components/Title"
import Layout from "../../components/Layout"
import FormInput from "../../components/FormInput"
import SideBarLayout from "../../components/SidebarLayout"

const Transfer = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState()
  const router = useRouter()
  useEffect(() => {
    const token = window.localStorage.getItem('beWalletToken')
    const userList = JSON.parse(window.localStorage.getItem('beWalletUsers'))
    setUsers(userList)
    if (!token) {
      router.push('/login')
    }
  }, [router])
  return(
    <div>
      <Title title="Transfer" />
      <SideBarLayout>
        <div className="p-4">
          <h5>Search Receiver</h5>
          <FormInput value={search} onChange={e => setSearch(e.target.value)} variant="rounded-3 border border-color5 p-2 mt-2 bg-color6"/>
          <div className="py-2 overflow-auto" style={{height: 350}}>
            {users?.map((user, idx) => {
              if(user.fullName.toLowerCase().includes(search) || user.fullName.toUpperCase().includes(search) || user.fullName.toLowerCase().includes(search.toLocaleLowerCase()) || user.phone[0]?.number.includes(search)) return(
                <div key={user.id} className="d-flex flex-row py-2" style={{cursor: "pointer"}} onClick={() => router.push(`/transfer/${[user.id]}`)}>
                  <Image src={user.picture || defaultUser} width={50} height={50} layout="fixed" objectFit="cover" alt={user.id} className="rounded-3"/>
                  <div className="ms-3">
                    <p className="m-0 p-0">{user.fullName}</p>
                    <p className="m-0 p-0">{user.phone[0]?.number || user.email}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SideBarLayout>
    </div>
  )
}

export default Transfer