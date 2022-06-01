import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
  return(
    <div className='bg-color7'>
      <Header />
      <div className="my-5">
        <div className="pt-5">
        {children}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout