import Layout from "../components/Layout"
import { getHistory } from "../redux/actions/transactions"
import { getAllUser } from "../redux/actions/users"

export const getServerSideProps = async() => {
  const dataHistory = getHistory().JSON
  // const dataUser = getAllUser(token)
  
  return{
    props: {
      history: 
        dataHistory

    }
  }
}

const Try = (histories) => {
  return (
    <Layout>
      {histories.map((data)=>{
        return(
          <div key={data.id}>
            <p>{data.id}</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default Try