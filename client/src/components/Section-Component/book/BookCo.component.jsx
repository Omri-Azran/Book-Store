import { useNavigate } from 'react-router-dom';
import './bookco.css'
const Book = (props) => {
    const navigate = useNavigate();

    const handleBookClick = () => navigate(`/books/${props.id}`);

    return (
        <div onClick={handleBookClick} className="bookitem">
            <img src={props.bookCover} alt={props.title}  className="bookimg" />

            <h4>{props.title}</h4>

            <h5>{props.author}</h5>
        </div>
    );
};

export default Book;
