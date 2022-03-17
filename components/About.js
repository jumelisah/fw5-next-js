const About = ({subTitle, icon, children, variant}) => {
  return(
    <div className={`mx-auto p-4 ${variant}`} style={{borderRadius: '10px'}}>
      <p className='text-color1 bg-color8 rounded-circle mx-auto' style={{width: '30px', height: '30px'}}>{icon}</p>
      <h2 className="pt-3 fs-3">{subTitle}</h2>
      <p className='pt-4 lh-lg mx-auto' style={{maxWidth: '270px'}}>{children}</p>
    </div>
  )
}

export default About