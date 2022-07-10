import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Signup from "./pages/Signup-Page/Signup.component.jsx";
import Login from "./pages/Login-Page/Login.component.jsx";
import Home from "./pages/Home-Page/Home.component.jsx";
import NotFound from "./pages/Not-Found-Page/Notfound.component.jsx";
import Cart from "./pages/Cart-Page/Cart.component.jsx";
import Book from "./pages/Book-Page/Book.component.jsx";

import AuthContextProvider from "./contexts/Auth.context.jsx";
import CartContextProvider from './contexts/Cart.context.jsx';

import Header from "./components/Section-Component/Header/Header.component.jsx";
import Footer from "./components/Section-Component/Footer/Footer.component.jsx";


import {BrowserRouter, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
            <CartContextProvider>

                <Header />
                    <div className='main-page'>
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="cart" element={<Cart/>} />
                            <Route path="books/:bookID" element={<Book />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="login" element={<Login />} />
                            <Route path="*" element ={<NotFound />} />
                        </Routes>

                    </div>
                <Footer />

            </CartContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
)}

export default App;
