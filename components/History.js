import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const DataHistory = ({dataHistory, dataUser}) => {
  const [userData, setUserData] = useState()
  useEffect(() => {
    setUserData(JSON.parse(window.localStorage.getItem('beWalletUser')))
    dataHistory.reverse()
  }, [dataHistory])
  return(
    <div className='container'>
      {dataHistory.map((history)=>{
        return(
            dataUser.map((users)=>{
              if(users.id === userData?.id && users.id===history.userId){
                return(
                <div key={history.id} className='d-flex mb-2 align-items-center'>
                  <Image src={`${users.picture ? users.picture : '/images/ZWALLET.png'}`} alt={users.fullName} width={40} height={40} layout='fixed'/>
                  <div className='ms-2'>
                    <p className='m-0 p-0'>{users.fullName}</p>
                    <p className='m-0 p-0'>{history.mutation_type.name}</p>
                  </div>
                  <p className={`ms-auto my-auto ${history.mutation_type.id===1 ? 'text-primary' : 'text-danger'}`}>{`${history.mutation_type.id===1 ? '+' : '-'} ${history.amount}`}</p>
                </div>
                )
              }else if(users.id!==userData?.id && users.id===history.userId && history.anotherUserId){
                return(
                  <div key={history.id} className='d-flex mb-2 align-items-center'>
                    <Image src={`${users.picture ? users.picture : '/images/ZWALLET.png'}`} alt={users.fullName} width={40} height={40} layout='fixed'/>
                    <div className='ms-2'>
                      <p className='m-0 p-0'>{users.fullName}</p>
                      <p className='m-0 p-0'>{history.mutation_type.name}</p>
                    </div>
                    <p className={`ms-auto my-auto ${history.mutation_type.id===3 ? 'text-primary' : 'text-danger'}`}>{`${history.mutation_type.id===3 ? '+' : '-'} ${history.amount}`}</p>
                  </div>
                )
              }
          })
          )
      })}
    </div>
  )
}
