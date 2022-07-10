import express, { text } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToMongoDB from './databases/mongoose.db.js'
import userRouter from './routers/user.router.js'
import cartRouter from './routers/cart.router.js'
import bookRouter from './routers/book.router.js'
//boilerplate
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors()); 


//requests
app.use(userRouter);
app.use(cartRouter);
app.use(bookRouter);

//listen
app.listen(port, async ()=>{

    await connectToMongoDB();
    console.log(`connected on port ${port}`);
})
