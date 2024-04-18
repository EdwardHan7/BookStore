import React, { useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { Book } from '../types/index'; 

const Home: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);  

    const openAddBookModal = () => setIsAdding(true);
    const closeAddBookModal = () => setIsAdding(false);
    const openEditBookModal = (book: Book) => {  
        setSelectedBook(book);
        setIsAdding(true);
    };
    const closeEditBookModal = () => {
        setSelectedBook(null);
        setIsAdding(false);
    };

    return (
        <div>
            <button onClick={openAddBookModal}>Add Book</button>
            <BookList onEdit={openEditBookModal} />
            {isAdding && (
                <BookForm 
                    book={selectedBook}
                    onClose={selectedBook ? closeEditBookModal : closeAddBookModal}
                />
            )}
        </div>
    );
}

export default Home;
