import './style.css'

const Button4 = ({children,...buttonProps}) => {

    return (
        <div className='button4' {...buttonProps} >{children}</div>
    )
}

export default Button4