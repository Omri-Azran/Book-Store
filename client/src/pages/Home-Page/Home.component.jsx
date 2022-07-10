import './home.css'
import react from 'react'
import { useNavigate } from 'react-router-dom'
import BookCo from '../../components/Section-Component/book/BookCo.component.jsx'
import { useState, useEffect } from 'react'
const Home = () =>{
    const navigate = useNavigate();
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books`);

                if (!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const books = responseObj.data;

                setBooks(books);
            } catch (err) {
                navigate('*');
            }
        };

        getBooks();
    }, []);
    return(
        <div className='homepage'>
                {books.map((book) => 
                         <BookCo
                        key={book._id}
                        id={book._id}
                        title={book.title}
                        author={book.author}
                        bookCover={book.bookCover}
                    />
     
                )}
        </div>
    )
}

export default Home