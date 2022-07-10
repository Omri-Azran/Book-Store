import react from 'react'
import './button.css'


const Button = (props) =>{
    return(
        <button type={props.type} onClick={props.onClick} className={`button-18 ${props.className}`}>
            {props.name}
        </button>
    )
}

export default Button