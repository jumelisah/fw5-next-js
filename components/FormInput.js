const FormInput = ({value, type, name, icon, placeholder, variant, required, onChange}) => {
  return(
    <div className='position-relative mb-4'>
    <input type={type} name={name} value={value} placeholder={placeholder} className={`px-4 py-2 border-0 border-bottom ${variant}`} required={required ? 'required' : ''} style={{width: '100%', outline: 'none'}} onChange={onChange}/>
    <p className='position-absolute top-50 start-0 translate-middle-y m-0' style={{eight: '24px'}}>{icon}</p>
    </div>
  )
}

export default FormInput