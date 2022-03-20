export const History = ({dataHistory, dataUser}) => {
  return(
    <div className='container'>
      {dataHistory.map((history)=>{
        dataUser.map((user)=>{
          return(
            user.id===history.userId &&
              <div>{user.id}</div>
          )
        })
      })}
    </div>
  )
}