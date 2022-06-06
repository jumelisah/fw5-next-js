import Image from "next/image"
import { useEffect, useState } from "react"
import defaultUser from "../public/images/default-user.png"

export const DataHistory = ({dataHistory, dataUser, limit=dataHistory?.length}) => {
  const [userData, setUserData] = useState()
  useEffect(() => {
    setUserData(JSON.parse(window.sessionStorage.getItem('beWalletUser')))
  }, [dataHistory])
  return(
    <div className='container'>
      {dataHistory?.map((history, idx)=>{
        if(idx < limit) {
        return(
            dataUser.map((users)=>{
              if(users.id === userData?.id && users.id===history.userId && !history.anotherUserId){
                return(
                <div key={history.id} className='d-flex mb-2 align-items-center'>
                  <Image className="rounded-3" src={users?.picture || defaultUser} alt={users.fullName} width={40} height={40} layout='fixed' objectFit="cover"/>
                  <div className='ms-2'>
                    <p className='m-0 p-0 fw-bold' style={{fontSize: 14}}>{users.fullName}</p>
                    <p className='m-0 p-0' style={{fontSize: 12}}>{history.mutation_type.name}</p>
                  </div>
                  <p className={`ms-auto my-auto ${history.mutation_type.id===1 ? 'text-primary' : 'text-danger'}`}>{`${history.mutation_type.id===1 ? '+' : '-'} Rp ${history.amount?.toLocaleString('id-ID')}`}</p>
                </div>
                )
              }else if(users.id!==userData?.id && users.id===history.userId && history.anotherUserId){
                return(
                  <div key={history.id} className='d-flex mb-2 align-items-center'>
                    <Image className="rounded-3" src={users?.picture || defaultUser} alt={users.fullName} width={40} height={40} layout='fixed' objectFit="cover"/>
                    <div className='ms-2'>
                      <p className='m-0 p-0 fw-bold' style={{fontSize: 14}}>{users.fullName}</p>
                      <p className='m-0 p-0' style={{fontSize: 12}}>Accept</p>
                    </div>
                    <p className={`ms-auto my-auto ${history.mutation_type.id===3 ? 'text-primary' : 'text-danger'}`}>{`${history.mutation_type.id===3 ? '+' : '-'} Rp ${history.amount?.toLocaleString('id-ID')}`}</p>
                  </div>
                )
              } else if(users.id!==userData?.id && users.id===history.anotherUserId) {
                return(
                  <div key={history.id} className='d-flex mb-2 align-items-center'>
                    <Image className="rounded-3" src={users?.picture || defaultUser} alt={users.fullName} width={40} height={40} layout='fixed' objectFit="cover"/>
                    <div className='ms-2'>
                      <p className='m-0 p-0 fw-bold' style={{fontSize: 14}}>{users.fullName}</p>
                      <p className='m-0 p-0' style={{fontSize: 12}}>{history.mutation_type.name}</p>
                    </div>
                    <p className="ms-auto my-auto text-danger">- Rp {history.amount?.toLocaleString('id-ID')}</p>
                  </div>
                )
              }
          })
          )
        }
      })}
    </div>
  )
}
