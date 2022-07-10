import MESSEGES_ACTION_TYPES from '../actions/signup.actions.js'


export const SIGNUP_INITIAL_STATE = {
    MESSEGES:{
        FIRST_NAME_MESSEGE:"",
        LAST_NAME_MESSEGE:"",
        EMAIL_MESSEGE:"",
        PASSWORD_MESSEGE:"",
        REPEATED_PASSWORD_MESSEGE:""
    },
    VALUES:{
        FIRST_NAME_VALUE:"",
        LAST_NAME_VALUE:"",
        EMAIL_VALUE:"",
        PASSWORD_VALUE:"",
        REPEATED_PASSWORD_VALUE:""
    },
    VALIDITIES: {
        FIRST_NAME:true,
        LAST_NAME:true,
        EMAIL: true,
        PASSWORD: true,
        REPEATED_PASSWORD:true
    },
}



const messegeReducer = (state, action) =>{

    switch(action.type){
        case MESSEGES_ACTION_TYPES.DISPLAY_FIRST_NAME_MESSEGE : {            
            const updatedState = {
                MESSEGES: {...state.MESSEGES, FIRST_NAME_MESSEGE: action.payload.messege},
                VALUES: {...state.VALUES, FIRST_NAME_VALUE: action.payload.value},
                VALIDITIES: {...state.VALIDITIES, FIRST_NAME: action.payload.validity},            
            };
            return updatedState                
        }

        case MESSEGES_ACTION_TYPES.DISPLAY_LAST_NAME_MESSEGE : {
            const updatedState = {
                MESSEGES: {...state.MESSEGES, LAST_NAME_MESSEGE: action.payload.messege},
                VALUES: {...state.VALUES, LAST_NAME_VALUE: action.payload.value},
                VALIDITIES: {...state.VALIDITIES, LAST_NAME: action.payload.validity},            
            };
            return updatedState  
        }

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

        case MESSEGES_ACTION_TYPES.DISPLAY_REPEATED_PASSWORD_MESSEGE : {
            const updatedState = {
                MESSEGES: {...state.MESSEGES, REPEATED_PASSWORD_MESSEGE: action.payload.messege},
                VALUES: {...state.VALUES, REPEATED_PASSWORD_VALUE: action.payload.value},
                VALIDITIES: {...state.VALIDITIES, REPEATED_PASSWORD: action.payload.validity},            
            };
            return updatedState        
        }

        default : return state
    }  
    
}

export default messegeReducer