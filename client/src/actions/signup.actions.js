const MESSEGES_ACTION_TYPES={
    DISPLAY_FIRST_NAME_MESSEGE:"NAME_MESSEGE",
    DISPLAY_LAST_NAME_MESSEGE:"LAST_NAME_MESSEGE",
    DISPLAY_EMAIL_MESSEGE:"EMAIL_MESSEGE",
    DISPLAY_PASSWORD_MESSEGE:"PASSWORD_MESSEGE",
    DISPLAY_REPEATED_PASSWORD_MESSEGE:"REPEATED_PASSWORD_MESSEGE"
}


export const firstNameMessege = (messege, value, validity) =>{       
    const action = {
        type:MESSEGES_ACTION_TYPES.DISPLAY_FIRST_NAME_MESSEGE,
        payload:{
            messege:messege,
            value:value,
            validity:validity
        }
    }

    return action
}

export const lastNameMessege = (messege, value, validity) =>{       
    const action = {
        type:MESSEGES_ACTION_TYPES.DISPLAY_LAST_NAME_MESSEGE,
        payload:{
            messege:messege,
            value:value,
            validity:validity
        }
    }
    
    return action
}

export const emailMessege = (messege, value, validity) =>{  
    const action = {
        type:MESSEGES_ACTION_TYPES.DISPLAY_EMAIL_MESSEGE,
        payload:{
            messege:messege,
            value:value,
            validity:validity
        }
    }

    return action
}

export const passwordMessege = (messege, value, validity) =>{  
    const action = {
        type:MESSEGES_ACTION_TYPES.DISPLAY_PASSWORD_MESSEGE,
        payload:{
            messege:messege,
            value:value,
            validity:validity
        }
    }

    return action
}

export const repeatedPasswordMessege = (messege, value, validity) =>{  
    const action = {
        type:MESSEGES_ACTION_TYPES.DISPLAY_REPEATED_PASSWORD_MESSEGE,
        payload:{
            messege:messege,
            value:value,
            validity:validity
        }
    }

    return action
}


export default MESSEGES_ACTION_TYPES