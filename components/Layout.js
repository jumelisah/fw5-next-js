import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
  return(
    <div className='bg-color7 vh-100'>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default Layout