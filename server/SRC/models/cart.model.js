import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'UserData'
    },
    books:[{
        bookID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'BookData', 
        },
        
    }],
})


const CartModel = mongoose.model('CartData', CartSchema);

export default CartModel