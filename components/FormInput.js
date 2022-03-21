const FormInput = ({type, name, icon, placeholder, variant, required}) => {
  return(
    <div className='position-relative mb-4'>
    <input type={type} name={name} placeholder={placeholder} className={`px-4 py-2 ${variant}`} required={required ? 'required' : ''} style={{width: '100%', outline: 'none'}} />
    <p className='position-absolute top-50 start-0 translate-middle-y m-0' style={{eight: '24px'}}>{icon}</p>
    </div>
  )
}

export default FormInput