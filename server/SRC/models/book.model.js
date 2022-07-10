import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    author:{
        type: String,
        required:true,
    }, 
    bookCover:{
        type: String,
        required:true,
    }, 
    description:{
        type: String,
        required:true,
    }, 
    pages:{
        type: Number,
        required:true,
    }, 
    price:{
        type: Number,
        required:true,
    }
})

const BookModel = mongoose.model('BookData', BookSchema);

export default BookModel