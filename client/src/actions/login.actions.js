const MESSEGES_ACTION_TYPES={
    DISPLAY_EMAIL_MESSEGE:"EMAIL_MESSEGE",
    DISPLAY_PASSWORD_MESSEGE:"PASSWORD_MESSEGE",
}

export const emailMessege = (messege,value,validity) =>{  
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

export default MESSEGES_ACTION_TYPES