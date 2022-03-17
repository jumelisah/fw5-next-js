const About = ({subTitle, children, variant}) => {
  return(
    <div className={`rounded mx-auto p-3 ${variant}`}>
      <p>Phone</p>
      <h2 className="pt-3 fs-3">{subTitle}</h2>
      <p className='pt-4 lh-lg mx-auto' style={{maxWidth: '270px'}}>{children}</p>
    </div>
  )
}

export default About