import './style.css'

const Button = ({children,...buttonProps}) => {

    return (
        <div className='button' {...buttonProps} >{children}</div>
    )
}

export default Button