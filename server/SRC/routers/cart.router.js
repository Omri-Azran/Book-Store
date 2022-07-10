import express from 'express'
import * as cartController from '../controllers/cart.controller.js';
import AuthenticateToken from '../middlewares/auth.middleware.js'


const CartRouter = express.Router();

CartRouter.post('/cart/add-to-cart',AuthenticateToken, cartController.AddBookToCart)
CartRouter.get('/cart', AuthenticateToken, cartController.GetBooksInCart)
CartRouter.delete('/cart', AuthenticateToken, cartController.DeleteBook)
CartRouter.delete('/cart/checkout', AuthenticateToken, cartController.CheckoutAndDeleteCart)





export default CartRouter