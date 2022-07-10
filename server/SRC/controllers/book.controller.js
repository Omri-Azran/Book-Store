import BookModel from '../models/book.model.js'


export const GetOneBook = async (req,res) =>{

    const book = req.params.bookID

    try {
        const aBook = await BookModel.findById(book) 
       
        res.send({
            status:200,
            statustext:'ok',
            data:aBook,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"GetOneBook went wrong" + error})
    }
}

export const GetAllBooks = async (req,res) =>{
    
    const books = await BookModel.find()
    try {
        res.send({
            status:200,
            statustext:'ok',
            data:books,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"GetAllBooks went wrong" + error})
    }
}

export const PutBooksInStore = async (req, res) =>{
    
    const Book = BookModel(req.body)
    
    try {
        await Book.save();
        res.send({
            status:'',
            statustext:'',
            data:Book,
            messege:''
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            statustext:'Internal Server Error',
            messege:"PutBooksInStore went wrong" + error
        })
    }
}