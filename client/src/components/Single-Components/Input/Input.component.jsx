import react from 'react'
import './input.css'

const Input = (props) =>{
    return(
        <input type={props.type} onInput={props.onInputfunction} className={`${props.className} inputco`}  />
)}

export default Input