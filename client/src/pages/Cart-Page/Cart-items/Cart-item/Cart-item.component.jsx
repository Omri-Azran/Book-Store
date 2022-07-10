import { useContext } from 'react';

import { AuthContext } from '../../../../contexts/Auth.context';
import { CartContext } from '../../../../contexts/Cart.context';

import { updateCartAction } from '../../../../actions/cart.actions';

import './cart-item.css'

import Button from '../../../../components/Single-Components/Button/Button.component.jsx'
const CartItem = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handelRemoveFromCart = async () => {
        const data = { bookID: props.id };

        try {
            const response = await fetch(`http://localhost:3000/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer " + authContextValue.userToken,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            cartContextValue.dispatchCart(updateCartAction(props.id, props.price));
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="cart-item">
            <img src={props.bookCover} alt={props.title} />

            <div className="data">
                <h3>{props.title}</h3>
                <h4>{props.author}</h4>
            </div>

            <h5>{`${props.price}`}</h5>

            <Button name="Remove" onClick={handelRemoveFromCart} />
        </div>
    );
};

export default CartItem;