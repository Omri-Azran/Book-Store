import CART_ACTION_TYPES from '../actions/cart.actions';

export const CART_INITIAL_STATE = { 
    items: [], 
    price: 0, 
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.INIT_CART: {
            const CART_ITEMS = action.payload.cartItems;

            let PRICE = 0;
            for (let i = 0; i < CART_ITEMS.length; i++) {
                const CART_ITEM = CART_ITEMS[i].bookID;

                PRICE += CART_ITEM.price;
            }
            const updatedState = { 
                ITEMS: CART_ITEMS,
                PRICE: PRICE
            };

            return updatedState;
        }
        case CART_ACTION_TYPES.UPDATE_CART: {

            const UPDATED_CART_ITEMS = [...state.items].filter((item) => item.bookID._id !== action.payload.itemID);
            const UPDATED_PRICE = state.price - action.payload.itemPrice;

            const updatedState = { 
                ITEMS: UPDATED_CART_ITEMS, 
                PRICE: UPDATED_PRICE.toFixed(2)
            };

            return updatedState;
        }
        case CART_ACTION_TYPES.CHECKOUT: {
            const updatedState = { 
                ITEMS: [], 
                PRICE: 0 
            };

            return updatedState;
        }
        default:
            return state;
    }
};

export default cartReducer;