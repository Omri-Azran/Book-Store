import './header.css'
import react from 'react'
import Sidebar from '../Sidebar/Sidebar.component'

import { useState } from 'react'


const Header = () =>{
    const[sidebarClass, setSidebarClass] = useState("hidesidebar")
    const openSidebar =() =>{setSidebarClass("showsidebar")}
    const closeSidebar = () =>{setSidebarClass("hidesidebar")}
    
    return( 

        <div>
            <header>
                <h1>
                    Gamazon
                </h1>
                    <button className="burger" onClick={openSidebar} >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </button>


            
            </header>
            
                <Sidebar className={sidebarClass} hideSidebar={closeSidebar}/>
        </div>
    )
}

export default Header