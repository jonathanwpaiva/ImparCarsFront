import './style.css'

const Button3 = ({children,...buttonProps}) => {

    return (
        <div className='button3' {...buttonProps} >{children}</div>
    )
}

export default Button3