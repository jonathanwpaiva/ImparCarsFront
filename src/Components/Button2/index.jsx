import './style.css'

const Button2 = ({children,...buttonProps}) => {

    return (
        <div className='button2' {...buttonProps} >{children}</div>
    )
}

export default Button2