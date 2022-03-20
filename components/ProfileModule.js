import { BsArrowRight } from "react-icons/bs"

const ProfileModule = ({children}) => {
  return(
    <div className='container bg-color5 p-2 mb-3' style={{borderRadius: '10px', maxWidth: '400px'}}>
      <div className='d-flex'>
        {children}
        {children!=='Logout' ? <BsArrowRight className='ms-auto'/> : ''}
      </div>
    </div>
  )
}

export default ProfileModule