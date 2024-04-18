import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../store/slices/bookSlice';
import { RootState } from '../store/store';   
import { Book } from '../types';           

interface BookListProps {
    onEdit: (book: Book) => void;   
}

const BookList: React.FC<BookListProps> = ({ onEdit }) => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();

    const handleDelete = (id: string, event: React.MouseEvent) => {
        event.stopPropagation(); 
        dispatch(deleteBook(id));
    };

    return (
        <div className="book-list">
            {books.map((book: Book) => (
                <div key={book.id} className="book-item" onClick={() => onEdit(book)}>
                    <div>
                        {book.name} - ${book.price} - {book.category}
                        <button onClick={(event) => handleDelete(book.id, event)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default BookList;
