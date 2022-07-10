import './signup.css'

import react, { useReducer, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserModelSignup from '../../models/user.model';

import { AuthContext } from '../../contexts/Auth.context.jsx';

import Button from '../../components/Single-Components/Button/Button.component.jsx'
import Label from '../../components/Single-Components/Label/Label.component.jsx'
import Input from '../../components/Single-Components/Input/Input.component.jsx'
import Validator from 'validator'

import * as signupActions from '../../actions/signup.actions.js'
import messegeReducer, {SIGNUP_INITIAL_STATE} from '../../reducers/signup.reducers.js'


const Signup = () =>{
    
    const navigate = useNavigate()

    const authContextValue = useContext(AuthContext);
    
    const isContainingNumber = (string) =>{
        for (let i = 0; i < string.length; i++) {
            const element = string[i];
            if(!isNaN(element)){
                return true
            }
        }
        return false
    }


    

    
    const [signupState, dispatchMessege] = useReducer(messegeReducer, SIGNUP_INITIAL_STATE);
    
    const dispatchFirstNameMessege =(event) =>{
        if(event.target.value==="" || isContainingNumber(event.target.value)){
            dispatchMessege(signupActions.firstNameMessege("Please enter a valid first name",event.target.value,false))
        }
        else{
            dispatchMessege(signupActions.firstNameMessege("",event.target.value,true))
        }
    }
    const dispatchLastNameMessege =(event) =>{
        if(event.target.value==="" || isContainingNumber(event.target.value)){
            dispatchMessege(signupActions.lastNameMessege("Please enter a valid last name",event.target.value,false))
        }
        else{
            dispatchMessege(signupActions.lastNameMessege("",event.target.value,true))
        }
    }
    const dispatchEmailMessege =(event) =>{
        if(event.target.value==="" || !Validator.isEmail(event.target.value)){
            dispatchMessege(signupActions.emailMessege("Please enter a valid email",event.target.value,false))
        }
        else{
            dispatchMessege(signupActions.emailMessege("",event.target.value,true))
        }
    }
    const dispatchPasswordMessege =(event) =>{
        if(event.target.value==="" || !Validator.isStrongPassword(event.target.value)){
            dispatchMessege(signupActions.passwordMessege("Please enter a strong password - 8-20 characters, contains capital letters numbers and a special character",event.target.value,false))
        }
        else{
            dispatchMessege(signupActions.passwordMessege("",event.target.value,true))
        }
    }
    const dispatchRepeatedPasswordMessege =(event) =>{

        if(event.target.value==="" || event.target.value !== signupState.VALUES.PASSWORD_VALUE){
            dispatchMessege(signupActions.repeatedPasswordMessege("Passwords do not match",event.target.value,false))
        }
        else{
            dispatchMessege(signupActions.repeatedPasswordMessege("",event.target.value,true))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !signupState.VALIDITIES.FIRST_NAME ||
            !signupState.VALIDITIES.LAST_NAME ||
            !signupState.VALIDITIES.EMAIL ||
            !signupState.VALIDITIES.PASSWORD ||
            !signupState.VALIDITIES.REPEATED_PASSWORD ||
            signupState.VALUES.FIRST_NAME_VALUE ==='' ||
            signupState.VALUES.LAST_NAME_VALUE ==='' ||
            signupState.VALUES.EMAIL_VALUE ==='' ||
            signupState.VALUES.PASSWORD_VALUE ==='' ||
            signupState.VALUES.REPEATED_PASSWORD_VALUE ==='' 

        ) {
            console.log("your bad: " + 
            signupState.VALIDITIES.FIRST_NAME,
            signupState.VALIDITIES.LAST_NAME,
            signupState.VALIDITIES.EMAIL,
            signupState.VALIDITIES.PASSWORD,
            signupState.VALIDITIES.REPEATED_PASSWORD,
            signupState.VALUES.FIRST_NAME,
            signupState.VALUES.LAST_NAME,
            signupState.VALUES.EMAIL,
            signupState.VALUES.PASSWORD,
            signupState.VALUES.REPEATED_PASSWORD
            );
            return;
        }

        const data = new UserModelSignup( 
            signupState.VALUES.FIRST_NAME_VALUE, 
            signupState.VALUES.LAST_NAME_VALUE,
            signupState.VALUES.EMAIL_VALUE,
            signupState.VALUES.PASSWORD_VALUE)
        try 
        {
            const response = await fetch(`http://localhost:3000/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status !== 201) {
                throw new Error();
            }

            const responseData = await response.json();

            const token = responseData.data.token;

            localStorage.setItem('user-token', token);
            authContextValue.setUserToken(token);
            
            navigate('../');
        } catch (err) {
            
            alert('Something went wrong!');
        }
    };

    useEffect(() => {
        if (authContextValue.userToken) {
            navigate('../');
        }
    })

    return(
        <form action='/signup' className='signuppage' onSubmit={handleSubmit}> 
            <div className='signupcontent'>
                <Label name="First Name"/>
                <Input type="text" onInputfunction={dispatchFirstNameMessege}/>
                <Label className="signuppopup" name={signupState.MESSEGES.FIRST_NAME_MESSEGE} />
            </div>
            <div className='signupcontent'>
                <Label name="Last Name"/>
                <Input type="text" onInputfunction={dispatchLastNameMessege}/>
                <Label className="signuppopup" name={signupState.MESSEGES.LAST_NAME_MESSEGE} />
            </div>
            <div className='signupcontent'>
                <Label name="Email"/>
                <Input type="text" onInputfunction={dispatchEmailMessege}/>
                <Label className="signuppopup" name={signupState.MESSEGES.EMAIL_MESSEGE} />
            </div>
            <div className='signupcontent'>
                <Label name="Password"/>
                <Input type="password" onInputfunction={dispatchPasswordMessege}/>
                <div className="passmsgsignup">
                    <Label className="signuppopup" name={signupState.MESSEGES.PASSWORD_MESSEGE} />
                </div>            </div>
            <div className='signupcontent'>
                <Label name="Repeat Password"/>
                <Input type="password" onInputfunction={dispatchRepeatedPasswordMessege}/>
                <Label className="signuppopup" name={signupState.MESSEGES.REPEATED_PASSWORD_MESSEGE} />
            </div>

                    <Button type="submit" name="Sign Up" />
        </form>
    )
}

export default Signup
