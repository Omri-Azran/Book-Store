import './login.css'
import react from 'react'
import Button from '../../components/Single-Components/Button/Button.component'
import Label from '../../components/Single-Components/Label/Label.component'
import Input from '../../components/Single-Components/Input/Input.component'

import { AuthContext } from '../../contexts/Auth.context.jsx';

import UserModelLogin from '../../models/user.model.login.js'

import { useReducer, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import * as loginActions from '../../actions/login.actions.js'
import messegeReducer, {LOGIN_INITIAL_STATE} from '../../reducers/login.reducers.js'

import Validator from 'validator'

const Login = () =>{

    const navigate = useNavigate()
    const GoToSignup = () =>{
        navigate("../signup")
    }

    const authContextValue = useContext(AuthContext);

    const dispatchEmailMessege =(event) =>{
        if(event.target.value==="" || !Validator.isEmail(event.target.value)){
            dispatchMessege(loginActions.emailMessege("Please enter a valid email",event.target.value,false))
        }
        else{
            dispatchMessege(loginActions.emailMessege("",event.target.value,true))
        }
    }
    const dispatchPasswordMessege =(event) =>{
        if(event.target.value==="" || !Validator.isStrongPassword(event.target.value)){
            dispatchMessege(loginActions.passwordMessege(
                "Please enter a strong password: 8-20 characters, contains capital letters, numbers and a special character",event.target.value,false))
        }
        else{
            dispatchMessege(loginActions.passwordMessege("",event.target.value,true))
        }
    }

    const [loginState, dispatchMessege] = useReducer(messegeReducer, LOGIN_INITIAL_STATE);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            loginState.VALUES.EMAIL  === '' ||
            loginState.VALUES.PASSWORD === '' ||
            !loginState.VALIDITIES.EMAIL || 
            !loginState.VALIDITIES.PASSWORD 
            ) {
            return;
        }

        const data = new UserModelLogin(loginState.VALUES.EMAIL_VALUE, loginState.VALUES.PASSWORD_VALUE)

        try {
            const response = await fetch(`http://localhost:3000/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error();
            }
            
            const responseData = await response.json();
            const token = responseData.data.token;
            
            localStorage.setItem('user-token', token);
            authContextValue.setUserToken(token);
            
            navigate('../');
        } catch (err) {
            console.log(err);
            alert('Something went wrong c');
        }
    };

    useEffect(() => {
        if (authContextValue.userToken) {
            navigate('../');
        }
    })
    return(
        <form action='/login' className='loginpage' onSubmit={handleSubmit}>
            <div  className='logincontent'>
                <Label name="Email"/>
                <Input type="text" onInputfunction={dispatchEmailMessege}/>
                <Label className="loginpopup" name={loginState.MESSEGES.EMAIL_MESSEGE} />
            </div>
            <div  className='logincontent'>
                <Label name="Password"/>
                <Input type="password" onInputfunction={dispatchPasswordMessege}/>
                <div className="passmsglogin">
                    <Label className="loginpopup" name={loginState.MESSEGES.PASSWORD_MESSEGE} />
                </div>
            </div>
            <Button type="submit" name="Login" />

            <Label name="Dont have an account?" className="donthave"/>
            <Button type="button" name="Sign Up!" onClick={GoToSignup}/>

        </form>
    )
}

export default Login