import MESSEGES_ACTION_TYPES from '../actions/login.actions.js'


export const LOGIN_INITIAL_STATE = {
    MESSEGES:{
        EMAIL_MESSEGE:"",
        PASSWORD_MESSEGE:"",
    },
    VALUES:{
        EMAIL_VALUE:"",
        PASSWORD_VALUE:"",
    },
    VALIDITIES: {
        EMAIL: true,
        PASSWORD: true,
    },
}

const messegeReducer = (state, action) =>{

    switch(action.type){
        case MESSEGES_ACTION_TYPES.DISPLAY_EMAIL_MESSEGE : {
            const updatedState = {
                MESSEGES: {...state.MESSEGES, EMAIL_MESSEGE: action.payload.messege},
                VALUES: {...state.VALUES, EMAIL_VALUE: action.payload.value},
                VALIDITIES: {...state.VALIDITIES, EMAIL: action.payload.validity},            
            };
            return updatedState  
        }
        case MESSEGES_ACTION_TYPES.DISPLAY_PASSWORD_MESSEGE : {
            const updatedState = {
                MESSEGES: {...state.MESSEGES, PASSWORD_MESSEGE: action.payload.messege},
                VALUES: {...state.VALUES, PASSWORD_VALUE: action.payload.value},
                VALIDITIES: {...state.VALIDITIES, PASSWORD: action.payload.validity},            
            };
            return updatedState
        }
        default : return state
    }  
    
}

export default messegeReducer