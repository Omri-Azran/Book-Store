import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Single-Components/Button/Button.component.jsx'
import './book.css';

import { AuthContext } from '../../contexts/Auth.context.jsx';


const BookPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [book, setBook] = useState({
        title: "",
        bookCover:"",
        bookTitle:"",
        author:"",
        pages:"",
        price:"",
        description:""

    });

    const handleAddToCart = async () => {
        if (authContextValue.userToken == null) {
            alert('You must be logged in to your account');

            return;
        }

        const data = { bookID: params.bookID };
        try {
            const response = await fetch(`http://localhost:3000/cart/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + authContextValue.userToken,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const message = responseObj.message;

        } catch (err) {
            alert('Something went wrong!');
        }
    };

    useEffect(() => {
        const bookID = params.bookID;
        const getBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${bookID}`);
                
                if (!response.ok) {
                    throw new Error();
                }

                const responseObj = await response.json();
                const book = responseObj.data;
                setBook(book)
                
            } catch (err) {
                console.log(err);
                navigate('*');
            }
        };

        getBook();
    }, []);

    return (
        <div className="book-page">
            <div className="book-details">
                <img src={book.bookCover} alt={book.bookTitle} className="bookimg"/>

                <h3>{book.title}</h3>

                <h4>{book.author}</h4>

                <div className="meta-data">
                    <div>
                        <span>Pages: </span>
                        <span>{book.pages}</span>
                    </div>

                    <div>
                        <span>Price: </span>
                        <span>{book.price}</span>
                    </div>
                </div>

                <Button onClick={handleAddToCart} name="Add To Cart" />

                <div className="description">{book.description}</div>
            </div>
        </div>
    );
};

export default BookPage;