const FormInput = ({type, icon, placeholder, variant}) => {
  return(
    <div className='position-relative'>
    <input type={type} placeholder={placeholder} className={`px-4 py-2 ${variant}`}/>
    <p className='position-absolute top-50 start-0 translate-middle-y'>{icon}</p>
    </div>
  )
}

export default FormInput