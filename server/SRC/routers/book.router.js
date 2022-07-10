import express from 'express'
import * as bookController from '../controllers/book.controller.js';


const BookRouter = express.Router();

BookRouter.get('/books/:bookID', bookController.GetOneBook)
BookRouter.get('/books', bookController.GetAllBooks)
BookRouter.post('/books', bookController.PutBooksInStore)







export default BookRouter