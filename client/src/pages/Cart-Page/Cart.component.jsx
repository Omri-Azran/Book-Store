import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth.context.jsx';
import { CartContext } from '../../contexts/Cart.context.jsx';
import { initCartAction, checkoutAction } from '../../actions/cart.actions.js';

import CartItems from './Cart-items/Cart-items.component.jsx';
import Button from '../../components/Single-Components/Button/Button.component.jsx'
import './cart.css'
const Cart = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);


    const checkoutAndDeleteCart = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cart/checkout`, {
                method: 'DELETE',
                headers: {
                    'Authorization':"Bearer " + authContextValue.userToken,
                },
            });

            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;

            alert(message);

            cartContextValue.dispatchCart(checkoutAction());
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetch(`http://localhost:3000/cart`, {
                    headers: {
                        'Authorization': authContextValue.userToken,
                    },
                });

                if (!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const cart = responseObj.data;

                cartContextValue.dispatchCart(initCartAction(cart.books));
            } catch (err) {
                navigate('*');
            }
        };

        const userToken = localStorage.getItem('user-token');

        if (!userToken) {
            navigate('/');

            return;
        }

        getCart();
    }, []);
    return cartContextValue.cart.ITEMS.length === 0 ? (
        <main className="cart-page">
            <h2>Your cart is empty</h2>
        </main>
    ) : (
        <main className="cart-page">
            <CartItems />

            <div className='totals'>
                <h4>{`Total Price: ${cartContextValue.cart.price}`}</h4>

                <Button name="Checkout" type="button" onClick={checkoutAndDeleteCart} />
            </div>
                    
                
        </main>
    );
};

export default Cart;