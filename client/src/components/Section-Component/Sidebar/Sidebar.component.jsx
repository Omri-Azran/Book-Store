import './sidebar.css'
import React from "react"
import Button from '../../Single-Components/Button/Button.component.jsx'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/Auth.context.jsx';


const Sidebar = (props) => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/logout`, {
                method: 'DELETE',
                headers: {
                    'Authorization':"Bearer " + authContextValue.userToken,
                },
            });
            console.log(response.headers);
            console.log(authContextValue.userToken);
            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.messege;
            alert(message);

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);
            props.hideSidebar();

            navigate('/');
        } catch (err) {
        }
    };

    const handleNavigation = (string) =>{
        props.hideSidebar()
        navigate(string)
    }

    return (
        <div className={`${props.className} `}>

            <div className={`sidebarpage `}>
                    
                    <Button name="X" type="button" className="closebutton" onClick={() => handleNavigation()}/>

                    <Button name="Home" className="sidebar-item" onClick={() => handleNavigation("")} />

                    {!authContextValue.userToken && (
                        <Button name="Login" className="sidebar-item" onClick={() => handleNavigation("login")} />        
                        )}

                    {authContextValue.userToken && (
                        <Button name="Logout" className="sidebar-item" onClick={handleLogout}/>
                        )}

                    {authContextValue.userToken && (
                        <Button name="Cart" className="sidebar-item" onClick={() => handleNavigation("cart")}/>
                        )}
            </div>
        </div>
    );
};

export default Sidebar;
