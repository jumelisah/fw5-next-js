import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/pallete.scss'
import store from '../redux/store.js'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import('bootstrap/dist/js/bootstrap.bundle');
  }, []);
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
