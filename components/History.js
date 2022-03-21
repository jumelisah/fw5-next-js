import Image from "next/image"

export const History = ({dataHistory, dataUser}) => {
  return(
    <div className='container'>
      {dataHistory.map((history)=>{
        return(
            dataUser.map((users)=>{
              if(users.id===history.anotherUserId || users.id===history.userId){
                return(
              <div key={history.id} className='d-flex mb-2 align-items-center'>
                <Image src={`${users.picture ? users.picture : '/images/ZWALLET.png'}`} alt={users.fullName} width={40} height={40} layout='fixed'/>
                <div className='ms-2'>
                  <p className='m-0 p-0'>{users.fullName}</p>
                  <p className='m-0 p-0'>{history.mutation_type.name}</p>
                </div>
                <p className={`ms-auto my-auto ${history.mutation_type.id===1 ? 'text-primary' : 'text-danger'}`}>{`${history.mutation_type.id===1 ? '+' : '-'} ${history.amount}`}</p>
              </div>
              )}
          })
          )
      })}
    </div>
  )
}
