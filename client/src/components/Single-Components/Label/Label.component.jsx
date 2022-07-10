import react from 'react'
import './label.css'

const Label = (props) =>{
    return(
        <label className={`${props.className} labelco`}>
            {props.name}
        </label>
    )
}

export default Label