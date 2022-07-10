import CartModel from '../models/cart.model.js';

export const AddBookToCart = async (req,res) =>{
    const bookID = req.body.bookID
    
    const Cart = await CartModel.findOne({ownerID:req.user._id})
    try {
        
        if(!Cart.books.find((bookDoc)=> bookDoc.bookID.toString() === bookID)) {
            Cart.books.push({bookID: bookID});
        }
        else{
            console.log("book is already in cart");
        }
        await Cart.populate("books.bookID")
        await Cart.save();
        console.log(Cart);
        
        res.send({
            status:200,
            statusText:'ok',
            data:Cart,
            messege:"",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error' + error,
            messege:`CreateCart went wrong: ` + error})
        }
}
export const GetBooksInCart = async (req,res) =>{
    
    const Cart = await CartModel.findOne(req.user._id)

    try {
        await Cart.populate("books.bookID")
        await Cart.save();
        res.send({
            status:200,
            statustext:'ok',
            data:Cart,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"GetBooksInCart went wrong" + error})
    }
}
export const DeleteBook = async (req,res) =>{
    
    const Cart = await CartModel.findOne({ownerID: req.user._id})

    
    try {
        Cart.books = Cart.books.filter(RestOfBooks => RestOfBooks.bookID.toString() !== req.body.bookID )
        await Cart.populate("books.bookID")
        await Cart.save();
        console.log(Cart.books);
        res.send({
            status:200,
            statustext:"ok",
            data:Cart,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"DeleteBook went wrong" + error})
    }
}
export const CheckoutAndDeleteCart = async (req,res) =>{
    
    const Cart = await CartModel.findOne(req.user._id)

    try {
        Cart.books = []
        await Cart.save();

        res.send({
            status:200,
            statustext:"ok",
            data:{books:Cart.Books},
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"CheckoutAndDeleteCart went wrong" + error})
    }
}