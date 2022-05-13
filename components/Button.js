import styles from './Button.module.css'

const Button = ({children, variant, ...rest}) => {
  return(
    <button className={`${styles.button} radius border border-color3 py-2 ${variant} `} {...rest} >
      {children}
    </button>
  )
}

export default Button